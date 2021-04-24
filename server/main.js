const express =require('express')
const mongoose=require('mongoose')
const body_parser=require('body-parser')
const cors=require('cors')


const app=express();

app.use(body_parser.json({limit:"30mb",extended:true}))
app.use(body_parser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

const url="mongodb://localhost:27017/react";

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log(err));

app.use('/',require('./routes/posts'))
app.use('/',require('./routes/users'))

app.listen(5000,()=>console.log("Server Running.."))