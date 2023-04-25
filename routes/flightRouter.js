const express=require("express");
const {flightModel}=require("../models/flightModel");

const flightRouter=express.Router();

flightRouter.get("/",async(req,res)=>{
    try {
        let allflight=await flightModel.find();
        res.status(200).send(allflight);
    } catch (error) {
        res.status(404).send({"Error":error.message});
    }
})


flightRouter.get("/:id",async(req,res)=>{
    const ID=req.params.id;
    try {
        let allflight=await flightModel.findOne({_id:ID});
        res.status(200).send(allflight);
    } catch (error) {
        res.status(404).send({"Error":error.message});
    }
})


flightRouter.post("/",async(req,res)=>{
    try {
        let flight=new flightModel(req.body);
        await flight.save()
        res.status(201).send({"Mess":"Flight Created"});
    } catch (error) {
        res.status(404).send({"Error":error.message});
    }
})


flightRouter.patch("/:id",async(req,res)=>{
    const ID=req.params.id;
    try {
        let flight=await flightModel.findByIdAndUpdate({_id:ID},req.body);
        res.status(204).send();
    } catch (error) {
        res.status(404).send({"Error":error.message});
    }
})

flightRouter.delete("/:id",async(req,res)=>{
    const ID=req.params.id;
    try {
        let flight=await flightModel.findByIdAndDelete({_id:ID});
        res.status(202).send({"Mess":"Flight Deleted"});
    } catch (error) {
        res.status(404).send({"Error":error.message});
    }
})


module.exports={flightRouter} 