const express=require('express');
const router=express.Router();
const Menu=require('../models/Menu');

router.post('/',async(req,res)=>{
    try{
       const menuData=req.body;
       const newMenu=new Menu(menuData);
       const response=await newMenu.save();
       res.status(200).json(response);
    }catch(e){
       res.status.json({e: "Internal Server Error"});
    }
 });
 router.get('/',async(req,res)=>{
      try{
             const getResponse=await Menu.find();
             res.status(200).json(getResponse);
      }catch(e){
       res.status.json({e: "Internal Server Error"});
      }
 });
 module.exports=router;