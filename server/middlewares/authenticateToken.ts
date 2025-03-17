import { NextFunction , Request, Response} from "express";
import { User } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_ACCESS_SECRET } from "../types/auth/secrets";
import { AuthRequest } from "../types/auth/authenticateTokens";

async function authenticateToken(req : AuthRequest, res : Response, next : NextFunction){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ status: "error", error: "Access denied. No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
    if(!decoded || !decoded.id){
        res.status(403).json({error: "Invalid access token." });
        return;
    }
    const user = await User.findById(decoded.id);
    if (!user) {
        res.status(403).json({error: "User not found." });
        return;
    }
    req.user = user;
    next();
}

export default authenticateToken