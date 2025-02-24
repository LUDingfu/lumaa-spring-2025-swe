import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        res.status(401).json({ message: 'Access token missing.' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};
