const {Schema,model}=require('mongoose')
const postSchema=new Schema({
    title:String,
    content:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    // comments:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Comment"
    // }],
    pic:String

},{timestamps:true})
const Post=model("Post",postSchema)
module.exports=Post