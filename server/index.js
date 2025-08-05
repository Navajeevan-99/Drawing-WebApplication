const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const app=express();
const form=require('./model/form.model');
app.use(cors());
app.use(express.json());
const requestListener=()=>{
    console.log('Running successfully');
    connectdb();
}
const resp=(req,res)=>{
    res.json({'msg':'Leo'});
}
app.get('/',resp);
app.listen('7000',requestListener);


const checkconnection=()=>{
 console.log('Mongodb is successfully connected');
}
const message=(req,res)=>{
    var {name,email,password}=req.body;
    console.log(name+' '+password);
}
app.post('/form',message);


const connectdb=async()=>{
try{
await mongoose.connect("mongodb+srv://thegamersoftamil:2355@cluster0.s69lxd8.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0");
const connection=mongoose.connection;
await checkconnection();
}catch(e){
    console.log('connection error',e)
}

}


