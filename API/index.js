const { default: mongoose } = require("mongoose");
const express=require("express");
const app=express();
const dotenv=require("dotenv").config()
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const bcrypt=require("bcrypt");
const cors = require('cors');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(cors());
  

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to MongoDB')
    })
    .catch((err)=>{
        console.log('Error Connecting to Mongodb:',err)
    })


app.use(express.json());
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)

app.listen(8800,()=>{
    console.log("App is listening on 8800")
})