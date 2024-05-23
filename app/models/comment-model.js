const {Schema,model}=require('mongoose')
const commentSchema=new Schema({
    content:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    }
})
const Comment=model("comment",commentSchema)
module.exports=Comment