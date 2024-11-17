import express from "express";
import { sendMessagge } from "../controllers/message.controller.js";
import { getMessagge } from "../controllers/message.controller.js";
import protectRoute from "../../middleware/protectRoute.js";
const router=express.Router();
router.get("/get/:id",protectRoute,getMessagge);

router.post("/send/:id",protectRoute,sendMessagge);
export default router;