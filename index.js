import express, { json } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import multer from 'multer';
import excelToJson from 'convert-excel-to-json';
import xlsxParser from 'xlsxParser';
import xlsx from 'xlsx';
import path from 'path';

const app = express();


import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const port = 8000;
const URI ='mongodb://localhost:27017/Crud';

const userModel = mongoose.model('add',{name:String, age:Number,add:String})

const xlModel = mongoose.model('xl',{xl:String})







mongoose.connect(URI).then( () => {
 console.log("Connction IS Sucessfull..");
  
}).catch(error =>{
    console.log("Error", error);
})




app.get('/' , (req,res ) =>{
    res.status(200).json("working properly carefully")
})

app.post('/add' , (req,res ) =>{


    let name = req.body.name;
    let age = req.body.age;
    let add = req.body.add;
    let xl = req.body.xl;

    let newUser = new userModel({name:name,age:age,add:add,xl:xl})

    newUser.save( (error) =>{

        if(error){
            res.send("Data Submission Faild")
        }
        else{
            res.send("Data Add Sucessfully.......")
        }

    })
 
})





app.get('/xl' , (req,res ) =>{


    let file = xlsx.readFile(req.body.file);

  

    // console.log(file);
    // const wb = xlsx.readFile('./test.xlsx');
// console.log(wb);

const workSheet = file.Sheets['Sheet1']

console.log(workSheet);

const data = xlsx.utils.sheet_to_json(workSheet);
  console.log(data);

  return  res.status(200).json(data)
  





    let xl = req.body.xl;

    let newUser = new xlModel({xl:xl})

    newUser.save( (error) =>{

        if(error){
            res.send("Data Submission Faild")
        }
        else{
            res.send("Data Add Sucessfully.......")
        }

    })
 
});


//excel to json and stord to data base 

// global.__basedir = __dirname;
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
 
const upload = multer({storage: storage});
 
// -> Express Upload RestAPIs
app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});





app.listen(port , () => {console.log(`Server is Running on Port No ${port}`)});



