const { validationResult } = require('express-validator')
const Post=require('../models/post-model')
const User=require('../models/user-model')
const Comment=require('../models/comment-model')
const commentCltr={}
commentCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }
    const body=req.body
    try{
        const id=req.params.postId
        console.log(id)
        const comment=new Comment(body)
        comment.author=req.user.id
        comment.post=id
        await comment.save()
        res.json(comment)

    }catch(err){
        console.log(err)
        return res.status(500).json("some thing went wrong")
    }
}
commentCltr.list=async(req,res)=>{
    try{
        const id=req.params.postId
        //console.log(id)
        const comments=await Comment.find({post:id}).populate('author','username')
        if(!comments){
            return res.status(400).json('no comments for this post')
        }
        return res.json(comments)

    }catch(err){
        console.log(err)
        return res.status(500).json("some thing went wrong")
    }
    

}
commentCltr.listOne=async(req,res)=>{
    try{
        const postId=req.params.postId
        const commentId=req.params.commentId
        
        const comment=await Comment.findOne({post:postId,_id:commentId})
        if(!comment){
            return res.status(400).json('no comments for this post')
        }
        return res.json(comment)

    }catch(err){
        console.log(err)
        return res.status(500).json("some thing went wrong")
    }
    

}
commentCltr.update=async(req,res)=>{
    try{
        const postId=req.params.postId
        const commentId=req.params.commentId
        const body=req.body
        const comment=await Comment.findOneAndUpdate({post:postId,_id:commentId,author:req.user.id},body,{new:true})
        if(!comment){
            return res.status(404).json('record not found')
        }
        return res.json(comment)

    }catch(err){
        console.log(err)
        return res.status(500).json("some thing went wrong")
    }
}
commentCltr.delete=async(req,res)=>{
    try{
        const postId=req.params.postId
        const commentId=req.params.commentId
        const comment=await Comment.findOneAndDelete({post:postId,_id:commentId,author:req.user.id})
        if(!comment){
            return res.status(404).json('record not found')
        }
        return res.json('successfully deleted')



    }catch(err){
        console.log(err)
        return res.status(500).json("some thing went wrong")
    }
}
module.exports=commentCltr