import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/messages.controller.js";
const router = express.Router();
router.get('/conversations', protectRoute, getUsersForSideBar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);
export default router;
