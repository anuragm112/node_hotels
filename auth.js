const passport=require('passport');//It is a middleware that is used to handle the user authentication by verify the username & password of user such that whether it is correct or not.
const Person = require('./models/Person');
const LocalStrategy=require('passport-local').Strategy; // Another name is username-password authentication of user
const bcrypt=require('bcrypt');

passport.use(new LocalStrategy(async(USERNAME, password, done)=>{
    try{
       const user=await Person.findOne({username: USERNAME})
       if(!user){
         return done(null, false, { message: "User not found"});
       }
       const isPasswordMatch=await bcrypt.compare(password, user.password);
       if(isPasswordMatch){
         return done(null, user);
       }else{
         return done(null, false, { message: "Incorrect Password"});
       }
    }catch(e){
      return done(e);
    }
}));
module.exports=passport;