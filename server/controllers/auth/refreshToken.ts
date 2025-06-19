import serverErrorHandler from "../../utils/serverErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express";
import { generateAccessToken, setRefreshToken } from "../../utils/generateTokens";
import { JWT_REFRESH_SECRET } from "../../types/secrets";
import client from "../../config/redis"
import { ErrorResponsePayload, LoginResponse } from "../../types/auth/login";

const refreshToken = serverErrorHandler(async (req : Request, res : LoginResponse) =>  {
    if(!req.cookies || !req.cookies.refreshToken){
        res.status(403).json({
            error: "Invalid or expired refresh token",
        });
        return;
    }
    const refreshToken = req.cookies["refreshToken"];
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload
    if(!decoded || !decoded.id){
        res.status(403).json({
            error: "Invalid or expired refresh token",
        });
        return;
    }
    const currentRefreshToken = await client.get(decoded.id);
    if(!currentRefreshToken || currentRefreshToken != refreshToken){
        res.status(403).json({
            error: "Invalid or expired refresh token",
        });
        return;
    }
    await setRefreshToken(res, decoded.id);
    res.status(200).json({
        message : "Generated new access token",
        accessToken : generateAccessToken(decoded.id)
    });
});

export default refreshToken