// module.exports={
//     x:5,
//     y:9,
//     z:function hello(){
//         return 10;
//     }
// }

// console.log(process.argv);
// const fs=require('fs');
// const input=process.argv;
// if(input[2]=='add'){
//   fs.writeFileSync(input[3],input[4]);
// }else if(input[2]=='remove'){
//     fs.unlinkSync(input[3]);
// }else{
//     console.log('Invalid Output');
// }

// let a=6,b=0;

// let waitingData=new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve(9);
//  },2000);
// })
// waitingData.then((b)=>{
//   console.log(a+b);
// })

// console.log("Hello");
// setTimeout(()=>{
//   console.log("2 seconds");
// },2000);
// setTimeout(()=>{
//     console.log("0 seconds");
// },0);
// console.log("Bye");

const express =require('express');
const app=express();
const path=require('path');
const joinPath=path.join(__dirname,'public');
// app.use(express.static(joinPath));
app.get('/about',(req,res)=>{
  res.sendFile(`${joinPath}/about.html`)
})
app.set('view engine','ejs');
app.get('/profile',(_,res)=>{
  const user={
    name: 'Anurag',
    age: '22',
    city: "Panipat",
    email: "anuragmiglani8@gmail.com"
  }
  res.render('profile',{user});
});
app.listen(7000);