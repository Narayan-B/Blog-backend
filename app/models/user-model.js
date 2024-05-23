const {Schema,model}=require('mongoose')
const userSchema=new Schema({
    username:String,
    email:String,
    password:String,
    bio:String,
    role:{
        type:String,
        default:"user"
    },
    profile:String
},{timestamps:true})
const User=model("User",userSchema)
module.exports=User