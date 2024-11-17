import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



import authRoutes from './routes/authroutes.js';
import messageRoutes from "./routes/message.routes.js";
import  connectToMongoDB from "./db/connectToMongoDb.js";
import userRoutes from "./routes/user.routes.js";


const app=express();
dotenv.config();
const PORT=process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    //root route 
    res.send("hello world");
})
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/",userRoutes);



app.listen(4000,()=>
{
    connectToMongoDB();
    console.log(`server is running on ${PORT}`);
})