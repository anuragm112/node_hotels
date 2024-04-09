const express=require('express');
const route=express.Router();
const Person=require('../models/Person');
const bcrypt=require('bcrypt');
const {generateToken,jwtwebtoken}= require('../jwt')
route.post('/signup',async(req,res)=>{
    try{
       const personData=req.body;
       const hashPassword=await bcrypt.hash(personData.password,10);
       const newPerson=new Person({
        name: personData.name,
        age: personData.age,
        email: personData.email,
        work: personData.work,
        address: personData.address,
        contact: personData.contact,
        salary: personData.salary,
        username: personData.username,
        password: hashPassword
       });
       const response=await newPerson.save();
       console.log("Data Saved");
       const payload={
        id: response.id,
        username: response.username
       }
       const token= generateToken(payload);
       console.log("Token is: ",token);
       res.status(200).json({response: response, token: token});
    }catch(e){
        res.status(500).json({e: "Internal server error"});
    }
 });
 route.post('/login', async(req,res)=>{
    try{
        const {username, password}= req.body;
        const user=await Person.findOne({username: username});
        if(!user){
            res.status(401).json({error: "Invalid username"});
        }
        const matchPassword=await bcrypt.compare(password, user.password);
        if(!matchPassword){
            res.send("Incorrect Password");
        }
        const payload={
            id: user.id,
            username: user.username
        }
        const token=generateToken(payload);
        res.json({token});
    }
    catch(e){
        res.status(500).json({e: "Internal server error"});
    }
   
 });
 route.get('/profile',jwtwebtoke-n,async(req,res)=>{
    try{
        const user=req.user;
        const getProfile=await Person.findById(user.id);
        res.status(200).json(getProfile);
    }catch(e){
        res.status(500).json({e: "Internal server error"});
    } 
 });
 route.get('/',jwtwebtoken,async(req,res)=>{
    try{
       const data=await Person.find();
       res.status(200).json(data);
    }catch(e){
        res.status(500).json({e: "Internal server error"});
    }
 });
 route.put('/:id',jwtwebtoken,async(req,res)=>{
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
 route.get('/:workType',jwtwebtoken,async(req,res)=>{
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
 route.delete('/:id',jwtwebtoken,async(req,res)=>{
    try{
        const personId=req.params.id;
        const deleteData=await Person.findByIdAndDelete(personId);
        if(deleteData){
            res.status(400).json("Person Deleted Successfully");
        }
    }catch(e){
        res.status(500).json({e: "Internal Server Error"});
    }
 });
 module.exports=route;
//  // "name": "Ankit Verma",
//  "age": 22,
//  "email": "ankit9@gmail.com",
//  "work": "waiter",
//  "address": "Kachwa Road, Karnal",
//  "contact": 8965567881,
//  "salary": 600000,