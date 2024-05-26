const {validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/user-model')
const userCltr={}
userCltr.Register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        const user=new User(body)
        user.password=hashPassword
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json('something went wrong')
    }

}
userCltr.Login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(user){
            const isAuth=await bcryptjs.compare(body.password,user.password)
            if(isAuth){
                const tokenData={
                    id:user._id,
                    role:user.role
                }
                const token=jwt.sign(tokenData,process.env.SECRETKEY,{expiresIn:'10d'})
               return res.json({'token':token})
            }
            return res.status(400).json('email/pw is wrong')
        }
        return res.status(400).json('email/pw is wrong')
    }catch(err){
        console.log(err)
        res.status(500).json('something went wrong')
    }
    
}
userCltr.checkEmail=async (req,res)=>{
    const email=req.query.email
    const user=await User.findOne({email:email})
    if(user){
        return res.json({status:true})
    }else{
        return res.json({status:false})
    }
}
userCltr.account = async (req, res) => {
    try {
        const account = await User.findOne({ _id: req.user.id });
        if (account) {
            return res.json(account);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user account:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
userCltr.profile=async(req,res)=>{
    if(!req.file){
        return res.status(400).json('profile is required')
    }
    try{

        const profilePath = req.file.path
        const newProfile = new User({ profilePath });
        

    // Save the new profile document to the database
    await newProfile.save();

    return res.status(201).json({ message: 'Profile image uploaded successfully' });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports=userCltr