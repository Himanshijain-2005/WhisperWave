import express from 'express';
const router=express.Router();
import {login,logout,signup} from "../controllers/auth.controllers.js";
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


export default router;