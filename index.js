const express=require('express');
const db=require('./db');
const app=express();
const passport=require('./auth');
require('dotenv').config();
const personRouter=require('./routes/personRoute');
const menuRouter=require('./routes/menuItems');
const bodyParser=require('body-parser');//act as a middleware in which parse and extract data from json to javascript object.
app.use(bodyParser.json());//req.body
//.env is used to manage important information or sensitive information
const logRequest=(req,res,next)=>{
   console.log(`[${new Date().toLocaleString()}] Request Mode to: ${req.originalUrl}`);
   next();//when current middleware function gets completed,its time to move to the next phase
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthentication=passport.authenticate('local', {session: false});
app.use('/person',personRouter);
app.use('/menuItems',menuRouter);

app.get('/',localAuthentication,function(req,res){
    res.send("Welcome to our hotel");
});
const PORT= process.env.PORT || 4000;
app.listen(PORT,()=>{
   console.log("Server Connected");
});
db();