const mongoose=require('mongoose');
const PersonSchema=new mongoose.Schema({
   name:{
    type: String,
    required: true
   },
   age:{
    type: Number
   },
   email:{
     type: String,
     unique: true,
     required: true
   },
   work:{
    type: String,
    enum: ['chef','manager','waiter'],
    required: true
   },
   address:{
    type: String,
    required: true
   },
   contact:{
    type: Number,
    required: true
   },
   salary:{
    type: Number,
    required: true
   }
});
const Person=new mongoose.model('Person',PersonSchema);
module.exports=Person;