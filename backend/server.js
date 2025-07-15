import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from 'cors'; // ✅ import cors


import authRoutes from './routes/authroutes.js';
import messageRoutes from "./routes/message.routes.js";
import  connectToMongoDB from "./db/connectToMongoDb.js";
import userRoutes from "./routes/user.routes.js";
//import {app,server} from "./socket/socket.js";
import {app,server} from "./socket/socket.js";
 const _dirname=path.resolve();

//const app=express();
dotenv.config();
app.use(cors({
  origin: 'https://whisperwave-1.onrender.com', // 👈 your frontend URL
  credentials: true // 👈 allow cookies if you're using them
}));
const port=process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    //root route 
    res.send("hello world");
})
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/",userRoutes);
app.use(express.static(path.join(_dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
})

server.listen(port,()=>
{
    connectToMongoDB();
    console.log(`server is running on ${port}`);
})
