const express=require('express');
const db=require('./db');
const app=express();
require('dotenv').config();
const personRouter=require('./routes/personRoute');
const menuRouter=require('./routes/menuItems');
const bodyParser=require('body-parser');//act as a middleware in which parse and extract data from json to javascript object.
app.use(bodyParser.json());//req.body
//.env is used to manage important information or sensitive information
app.use('/person',personRouter);
app.use('/menuItems',menuRouter);
const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>{
   console.log("Server Connected");
});
db();