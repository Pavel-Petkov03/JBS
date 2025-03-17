
import {Response, Request ,NextFunction} from "express"
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"
import client from "../config/redis"
import { TokenRequest } from "../types/auth/authenticateTokens"

function allowedToResetEntries<T extends Array<string>>(secret : string, passedEntries : T, uniqueEntry : T[number]){
    // this function is used when we want to reset some users data and we send him reset token
    // after the reset token is validated we destructure it and take the entries in verifiedEntries
    // this generates automatic request type

    return async (req : TokenRequest<T>, res : Response, next : NextFunction) => {
        const {token} = req.query;
        if(!token){
            res.status(400).json({
                "error" : "Not authorised"
            });
            return;
        }
        await client.get(`reset:${token}`);
        const decoded = jwt.verify(token, secret) as JwtPayload;
        if(!decoded){
            res.status(400).json({
                "error" : "Not authorised"
            });
            return;
        }
        const resetToken = await client.get(`reset:${decoded[uniqueEntry]}`);
        if(!resetToken || token !== resetToken){
            res.status(400).json({
                "error" : "Not authorised"
            });
            return
        }
        if (!req.body.verifiedEntries) {
            req.body.verifiedEntries = {} as { [K in T[number]]: string };
        }
        await client.del(`reset:${decoded[uniqueEntry]}`);
        passedEntries.forEach(entry => {
            req.body.verifiedEntries[entry as T[number]] = decoded[entry];
        });
        next();
    }
}
export default allowedToResetEntries
