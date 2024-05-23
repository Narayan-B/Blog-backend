const {Schema,model}=require('mongoose')
const profileSchema=new Schema({
    profile:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})
const  Profile=model('Profile',profileSchema)
module.exports=Profile