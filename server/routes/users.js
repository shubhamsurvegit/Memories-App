const express =require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const bodyparserurl=bodyparser.urlencoded({extended:true});
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const Post_message = require('../models/post_message');

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const existingUser=await User.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User does not exist"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Password Incorrect"})
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"});
        return res.status(200).json({result:existingUser,token:token})
    }
    catch(err){
        return res.status(500).json({message:err})        
    }
})

router.post('/signup',async (req,res)=>{
    const {username,email,password,confirmPassword}=req.body;
    try{
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:"User Exists"})
        }
        if(password!==confirmPassword){
            return res.status(400).json({message:"Password dont match"})
        }
        const hashedPassword=await bcrypt.hash(password,12)
        // const result=await User.create({username,email,name=`${firstname} ${lastname}`})
        const newUser=await User.create({username,email,password:hashedPassword})
        
        const token=jwt.sign({email:newUser.email,id:newUser._id},"test",{expiresIn:"1h"});
        return res.status(200).json({result:newUser,token:token})
    }
    catch(err){
        return res.status(500).json({message:err})
    }
})

router.post('/google/auth',async (req,res)=>{
    const {username,email,password}=req.body;
    try{
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"});
            return res.status(200).json({result:existingUser,token})
        }
        else{
            const newUser=await User.create({username,email,password})
        
            const token=jwt.sign({email:newUser.email,id:newUser._id},"test",{expiresIn:"1h"});
            return res.status(200).json({result:newUser,token:token})
        }
    }
    catch(err){
        return res.status(500).json({message:err})
    }
})

module.exports=router