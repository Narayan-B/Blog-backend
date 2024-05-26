const { validationResult } = require('express-validator');
const Profile = require('../models/profile-model');

const profileCltr = {};

profileCltr.create = async (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    if (!req.file) {
        return res.status(400).json('Profile image is required');
    }
    try {
        const profilePath = req.file.path;
        const newProfile = new Profile({
            profile: profilePath,
            user: req.user.id
        });

        // Save the new profile document to the database
        await newProfile.save();

        return res.status(201).json({ message: 'Profile image uploaded successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
profileCltr.see=async(req,res)=>{
    
    try{
        const profile=await Profile.findOne({user:req.user.id})
    if(!profile){
        return res.status(404).json('no profile found .create u r profile')
    }
    return res.json(profile)

    }catch(err){
        console.log(err)
        res.status(500).json('something went wrong')
    }
    
}
profileCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }
    if (!req.file) {
        return res.status(400).json('Profile image is required');
    }
    
    try{
        const body=req.body
        const profile=await Profile.findOneAndUpdate({user:req.user.id},body,{new:true})
        if(!profile){
            return res.status(404).json('no profile found .create u r profile')
        }
        return res.json(profile)

    }catch(err){
        console.log(err)
        res.status(500).json('something went wrong')
    }
}

module.exports = profileCltr;
