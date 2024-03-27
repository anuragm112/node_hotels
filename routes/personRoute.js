const express=require('express');
const route=express.Router();
const Person=require('../models/Person');

route.post('/',async(req,res)=>{
    try{
       const personData=req.body;
       const newPerson=new Person(personData);
       const response=await newPerson.save();
       res.status(200).json(response);
    }catch(e){
        res.status(500).json({e: "Internal server error"});
    }
 });
 route.get('/',async(req,res)=>{
    try{
       const data=await Person.find();
       res.status(200).json(data);
    }catch(e){
        res.status(500).json({e: "Internal server error"});
    }
 });
 route.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const data=req.body;
        const response=await Person.findByIdAndUpdate(personId,data,{
            new: true,
            runValidators: true
        });
        if(!response){
            res.status(400).json("Person not found");
        }
        res.status(200).json(response);
    }catch(e){
        res.status(500).json({e : "Internal server error"});
    }
 });
 route.get('/:workType',async(req,res)=>{
    try{
        const personType=req.params.workType;
        if(personType=='chef' || personType=='waiter' || personType=='manager'){
          const data=await Person.find({work: personType});
          res.status(200).json(data);
        }
    }
    catch(e){
        res.status(500).json({e: "Internal Server Error"});
    }
 });
 route.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const deleteData=await Person.findByIdAndDelete(personId);
        if(!deleteData){
            res.status(400).json("Person Deleted Successfully");
        }
    }catch(e){
        res.status(500).json({e: "Internal Server Error"});
    }
 });
 module.exports=route;
