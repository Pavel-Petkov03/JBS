import authenticateToken from "./authenticateToken"
import { AuthRequest } from "../types/auth/authenticateTokens"
import { Response, NextFunction } from "express"



const hasRoles = function (roles : [string]){
    return [
        authenticateToken,
        (req : AuthRequest, res : Response, next : NextFunction) => {
            roles.forEach(role => {
                if(req.user && req.user.role === role){
                    next();
                    return;
                }
            })
            res.status(403).json({
                "error" : "Not authorised"
            });
        },
    ]
}
export default hasRoles