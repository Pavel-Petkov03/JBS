import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import serverErrorHandler from "../../utils/serverErrorHandler";
import { JWT_REFRESH_SECRET } from "../../types/auth/secrets";
import { deleteRefreshToken } from "../../utils/generateTokens";
import { ErrorResponsePayload } from "../../types/auth/login";
const logout = serverErrorHandler(async (req : Request, res : Response<{message : string} | ErrorResponsePayload>)=> {
    const refreshToken = req.cookies["refreshToken"];
    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as JwtPayload;
        await deleteRefreshToken(res,decoded.id);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
});
export default logout