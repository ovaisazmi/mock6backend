const express=require("express");
const {connection}=require("./config/db.js");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
require("dotenv").config();

const {userModel}=require("./models/userModel");
const {flightRouter}=require("./routes/flightRouter");
const {bookingModel}=require("./models/bookingModel")

const app=express(); 
app.use(express.json());
app.use("/api/flights",flightRouter);

app.get("/",(req,res)=>{
    res.send("Server is working");
})



app.post("/api/register",async(req,res)=>{
    let {name,email,password}=req.body;
    try {
        bcrypt.hash(password,4,async(error,hashed)=>{
            if(hashed){
              let user=new userModel({name,email,password:hashed});
              await user.save();
              res.status(201).send({"Mess":"User Created"})
            }else{
                res.status(404).send({"Error":error.message})
            }
        })
    } catch (error) {
        res.status(404).send({"Error":error.message})
    }
})


app.post("/api/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
      let user=await userModel.findOne({email})
      if(user){
        bcrypt.compare(password,user.password,(error,result)=>{
            if(result){
                let token=jwt.sign({userID:user._id},"masai");
                res.status(201).send({"Mess":"Login Success","Token":token})
            }else{
                res.status(404).send({"Error":error.message})
            }
        })
      }else{
        res.status(404).send({"Error":"User Not Found"})
      }
    } catch (error) {
        res.status(404).send({"Error":error.message})
    }
})



app.post("/api/booking",async(req,res)=>{
    try {
        let booking=new bookingModel(req.body);
        await booking.save();
        res.status(201).send({"Mess":"Booking Created"})
    } catch (error) {
        res.status(404).send({"Error":error.message})
    }
})



app.get("/api/dashboard",async(req,res)=>{
    try {
        let booking=await bookingModel.find();
        res.status(200).send(booking)
    } catch (error) {
        res.status(404).send({"Error":error.message})
    }
})



app.listen(process.env.PORT,async()=>{
    try {  
        await connection
        console.log("Connected to DB");
    } catch (error) {
        
    }
    console.log("Server is Running on ",process.env.PORT);
})