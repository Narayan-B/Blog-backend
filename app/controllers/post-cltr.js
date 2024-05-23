const {validationResult}=require('express-validator')
const Post=require('../models/post-model')
const postCltr={}
postCltr.create = async (req, res) => {
    // Check validation errors on the request
    const errors = validationResult(req);
    console.log(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const post = new Post(body);
        post.author = req.user.id;
       
    try {
        await post.save();
        res.status(201).json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json('Something went wrong');
    }
};
postCltr.allPosts=async(req,res)=>{
    const posts=await Post.find()
    if(!posts){
        return res.status(404).json('No post found')
    }
    return res.json(posts)
}
postCltr.singlePost=async(req,res)=>{
    const id=req.params.id
    const post=await Post.findById(id)
    if(!post){
        return res.status(404).json('no post found')
    }
    return res.json(post)
}
postCltr.updatePost=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const post =await Post.findByIdAndUpdate({_id:id},body,{new:true})
    if(!post){
        return res.status(400).json('record not found')

    }
    return res.json(post)

    }catch(err){
        console.log(err)
        res.status(500).json("Something went wrong")
    }
    
}
postCltr.deletePost=async(req,res)=>{
    const id=req.params.id
    try{
        const post=await Post.findByIdAndDelete(id)
        if(!post){
            return res.status(404).json('record not found')
        }
        return res.json({msg:'successfully deleted',post})

    }catch(err){
        console.log(err)
        res.status(500).json("Something went wrong")
    }
}
postCltr.myPosts=async(req,res)=>{
    try{
        const myposts=await Post.find({author:req.user.id})
        if(myposts){
            return res.json(myposts)
        }
        return res.json(404).json('No posts found created by u')

    }catch(err){
        console.log(err)
        res.status(500).json("Something went wrong")
    }
}
module.exports=postCltr