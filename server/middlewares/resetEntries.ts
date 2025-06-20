
import {Response, Request ,NextFunction} from "express"
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"
import client from "../config/redis"
import { TokenRequest } from "../types/auth/authenticateTokens"

function generateTokenGateDecorator(tokenName : string){
    function allowedToResetEntries<T extends Array<string>>(secret : string, passedEntries : T, uniqueEntry : T[number]){
        // this function is used when we want to authenticate token from redis with low ttl
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
            await client.get(`${tokenName}:${token}`);
            const decoded = jwt.verify(token, secret) as JwtPayload;
            if(!decoded){
                res.status(400).json({
                    "error" : "Not authorised"
                });
                return;
            }
            const abstractToken = await client.get(`${tokenName}:${decoded[uniqueEntry]}`);
            if(!abstractToken || token !== abstractToken){
                res.status(400).json({
                    "error" : "Not authorised"
                });
                return;
            }
            if (!req.body.verifiedEntries) {
                req.body.verifiedEntries = {} as { [K in T[number]]: string };
            }
            passedEntries.forEach(entry => {
                req.body.verifiedEntries[entry as T[number]] = decoded[entry];
            });
            next();
        }
    }
    return allowedToResetEntries
}
export default generateTokenGateDecorator
