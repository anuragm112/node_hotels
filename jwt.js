const jwt=require('jsonwebtoken');
const jwtwebtoken=(req,res,next)=>{
      const authorization=req.headers.authorization;
      if(!authorization){
        res.status(401).json({error: "Token not found"});
      }
      const token=req.headers.authorization.split(' ')[1];
      if(!token){
        return res.status(401).json({e: "Unauthorized"});
      }
    try{
          const decoded=jwt.verify(token,process.env.SECRET_KEY);
          req.user=decoded;
          next();
    }catch{
       res.status(401).json({error: "Invalid token"});
    }
}

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.SECRET_KEY, {expiresIn: 30000});
}
module.exports={jwtwebtoken,generateToken};