const express =require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const bodyparserurl=bodyparser.urlencoded({extended:true});
const router=express.Router();
const PostMessage=require('../models/post_message');
const auth=require('../middleware/auth');
const Post_message = require('../models/post_message');

router.get('/posts',(req,res)=>{
    PostMessage.find({})
    .then((posts)=>{
        res.send(posts)
    })
    .catch((err)=>res.send(err))
})

router.post('/posts',auth,async (req,res)=>{
    const post=req.body;
    const newpost=new PostMessage({...post,owner:req.userId});
    try{
        await newpost.save();
        res.json(newpost);
    }
    catch{
        res.send(err)
    }
})

router.patch('/posts/:id',auth,(req,res)=>{
    PostMessage.findOneAndUpdate({_id:req.params.id},
        req.body,{new:true})
    .then((updated_post)=>{
        res.json(updated_post)
    })
    .catch((err)=>console.log(err))
})

router.delete('/posts/:id',auth,(req,res)=>{
    console.log(req.userId)
    PostMessage.deleteOne({_id:req.params.id})
    .then(()=>{
        res.json({msg:"DELETED"})
    })
    .catch((err)=>console.log(err))
})


router.patch('/posts/like/:id',auth, async (req,res)=>{
    console.log("ININ")
    const {id}=req.params;
    try{
        // if(!res.userId){
        //     return res.status(500).json({message:"Not authenticated"})
        // }
        const post=await Post_message.findById(id);
        if(!post){
            return res.json({msg:"NOT EXIST"})
        }
        const updatedPost=await Post_message.findByIdAndUpdate(id,{likes:post.likes+1},{new:true})
        res.json(updatedPost)
    }
    catch(err){
        res.status(500).json({msg:err})
    }
})

router.get('/api',(req,res)=>{
    return res.json("Shubham Surve")
})

module.exports=router;
