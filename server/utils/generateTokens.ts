import jwt from "jsonwebtoken";
import { Response } from "express";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
import client from "../config/redis";
function generateAccessToken(userId: string) {
    return jwt.sign(
        { id: userId },
        JWT_ACCESS_SECRET,
        { expiresIn: "1h" }
    );
}

function generateRefreshToken(userId: string) {
    return jwt.sign(
        { id: userId },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
}

async function setRefreshToken(res : Response, userId : string){
    const refreshToken = generateRefreshToken(userId);
    const ttl = 1000 * 60 * 60 * 24 * 7; // 7 days
    await client.setEx(userId, ttl, refreshToken);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: ttl,
      });
}

async function deleteRefreshToken(res : Response, userId : string) {
    try{
        await client.del(userId);
        res.clearCookie('refreshToken', { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict' 
        });
    }catch(error){
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export {
    generateAccessToken,
    generateRefreshToken,
    setRefreshToken,
    deleteRefreshToken
}
