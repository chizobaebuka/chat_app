import express from 'express';
import { getUserProfile, login, logout, signUp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/protectRoute.js';
const router = express.Router();
router.post('/login', login);
router.post('/signup', signUp);
router.post('/logout', logout);
router.get('/me', protectRoute, getUserProfile);
export default router;
