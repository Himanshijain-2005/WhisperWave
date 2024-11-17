import jwt from "jsonwebtoken";
import User from "../backend/models/user.model.js";
const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token)
        {
            return res.status(401).json({error:"unauthorized no token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
        {
            return res.status(401).josn({error:"unauthorized invalid token"});

        }
        const user=await User.findById(decoded.userId);
        if(!user)
        {
            return res.status(404).josn({error:"user not found"});

        }
        req.user=user;
        next();
    }
    catch(error)
    {
        console.log("error in protectroute middleware",error.message)
        res.status(500).json({error:"internal error server"});
    }
}
export default protectRoute;