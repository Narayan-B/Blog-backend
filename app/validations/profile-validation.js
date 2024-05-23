const Profile=require('../models/profile-model')
const profileValidationSchema={
    profile:{
        custom:{
            options:async function(value,{req}){
                const profile=await Profile.findOne({user:req.user.id})
                // console.log(req.user.id)
                // console.log(profile)
                if(profile){
                    throw new Error('profile already created')
                }
                return true

            }
        }
    }
}
module.exports=profileValidationSchema