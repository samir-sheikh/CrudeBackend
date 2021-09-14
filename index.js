import express from 'express';
import mongoose from 'mongoose';


const app = express();


import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const port = 8000;
const URI ='mongodb://localhost:27017/Crud';

const userModel = mongoose.model('add',{name:String, age:Number,add:String,email:String,mob:Number,school:String})









mongoose.connect(URI).then( () => {
 console.log("Connction IS Sucessfull..");
  
}).catch(error =>{
    console.log("Error", error);
})




app.get('/api/test' , (req,res ) =>{
    res.status(200).json("working properly carefully and we working the Mern Stack Technology........")
});


app.post('/api/post' , (req,res ) =>{

    let username = req.body.username
    res.send(`The Recived Data is ${username}`)

   
})

app.post('/add' , (req,res ) =>{


    let name = req.body.name;
    let age = req.body.age;
    let add = req.body.add;
    let email =  req.body.email;
    let mob = req.body.mob;
    let school = req.body.school;


    let newUser = new userModel({name:name,age:age,add:add,email:email,mob:mob,school:school})

    newUser.save( (error) =>{

        if(error){
            res.send("Data Submission Faild")
        }
        else{
            res.send("Data Add Sucessfully.......")
        }

    })
 
})


app.post('/getUser' , (req , res) => {

    userModel.find({} , (err,document) => {
        if(err){
            res.send("Somthing went rong")
        }else{
            res.send(document)
        }
    })


})
app.post('/getData' , (req,res) => {

   let serchField = req.query.name;
    userModel.find({name:{$regex : serchField,$options:'$i'}})
    .then(data => {
        res.send(data)
        console.log(data);
    }).catch(err =>{
        console.log(err);
        res.send(err);
    })
})

app.post('/serchData' , (req,res) => {

    let serch = new RegExp (req.body.query);

     userModel.find({name:{$regex : serch,$options:'$i'}})
     .then(data => {
         res.send(data)
         console.log(data);
     }).catch(err =>{
         console.log(err);
         res.send(err);
     })
 })






app.listen(port , () => {console.log(`Server is Running on Port No ${port}`)});



