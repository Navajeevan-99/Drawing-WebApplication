import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
const app=express();
const client=new MongoClient('mongodb+srv://thegamersoftamil:85RyJF6AqKHfJetp@drawingapp.lbaztii.mongodb.net/?retryWrites=true&w=majority&appName=drawingapp')
let db,collection;
app.use(cors());
app.use(express.json());
const users=[{name: 'Navajeevan',age:'20'},{name:'Leo',age:'19'}]
app.get('/',(req,res)=>{
res.end('Nothing');
})
app.get('/api/user',
    (req,res)=>{
        res.send(users)
        res.end();
    }
)
app.get('/api/admin',async (req,res)=>{
    const data=await collection.find().toArray();
    res.json(data);
})
app.patch('/api/admin',async (req,res)=>{
    console.log(req.body);
    await collection.deleteOne({name: req.body.name})

    res.json({msg: 'leo'})
})
app.post('/api/user',
   async (req,res)=>{
        console.log(req.body.name);
        let useravailable=await checkuser(req.body);
        if (!useravailable){
        await newuser(req.body);
        res.status(201);
        res.json({user: req.body.name});
}
        else{
            console.log("user available and already used");
            res.status(201);
            res.json({err: 'user available'});
        }
        
    }
)
app.post('/api/loginuser',async (req,res)=>{
    console.log(req.body);
    let useravailable=checkemail(req.body);
    if (useravailable){
        res.json({err: 'user available'})
    }
    else {
        res.json({err:'user not available'});
    }

})
app.put('/api/user',(req,res)=>{
    console.log(req.body.name)
    res.json({msg:'jeevan'})
    changeusername(req.body);
    
})
const changeusername=async (body)=>{
    try{
    await collection.updateOne({name: body.name},{$set:{name:body.newname

    }})}
    catch(e){
        console.log('error in update');
    }
    

}
const newuser=async (body)=>{
    try{
        const result= await collection.insertOne(body);
        console.log("user is created");

    }
    catch(err){
        console.log('insertion failed');
    }
    

}
const checkemail=async (body)=>{
    if (await await collection.findOne({
      $or: [{email: body.email},{password:body.password} ]
    }) )
    {
        return true;
    }
    return false;
    
}
const checkuser= async (body)=>{
   const existing = await collection.findOne({
      $or: [{ name: body.name }, { email: body.email }]
    });
    
    if (existing){
        return true;
    }
    return false;

}
app.listen(3003,()=>{
    console.log('server is running 3003');
});
async function connectdb(){
    try{
        await client.connect();
        db=client.db('drawingapp');
        collection=db.collection('users');
    }
    catch(err){
    console.log(err.message);
}
console.log('Mongodb is connected');
}

connectdb()
