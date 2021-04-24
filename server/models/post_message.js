const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    owner:String,
    title:String,
    message:String,
    creater:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const Post_message=mongoose.model('PostMsg',postSchema)

module.exports=Post_message