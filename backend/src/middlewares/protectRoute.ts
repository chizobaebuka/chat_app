import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma.js';
import { User } from '@prisma/client';

interface decodedToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
                username: string;
                fullName: string;
                profilePic: string;
            };
        }
    }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ error: "Not authorized, no token provided. Please login" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as decodedToken;
        if(!decoded){
            return res.status(401).json({ error: "Not authorized, token failed" });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.userId }, select: { id: true, username: true, fullName: true, profilePic: true } });
        if(!user) {
            return res.status(403).json({ error: "Not authorized, user not found" });
        }

        req.user = user;
        
        next();
    } catch (error: any) {
        console.error('Error in protect route middleware', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}