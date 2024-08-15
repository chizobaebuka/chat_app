import jwt from 'jsonwebtoken';
import prisma from '../db/prisma.js';
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Not authorized, no token provided. Please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Not authorized, token failed" });
        }
        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullName: true, profilePic: true } });
        if (!user) {
            return res.status(403).json({ error: "Not authorized, user not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error in protect route middleware', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
