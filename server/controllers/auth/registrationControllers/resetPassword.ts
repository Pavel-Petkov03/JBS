import { generateResetToken } from "../../../utils/generateTokens";
import { Request, Response } from "express";
import generateEmail from "../../../utils/generateEmail";
import client from "../../../config/redis";

async function resetController(req : Request, res : Response) {
    const {email} = req.body;
    const token = await generateResetToken(email);
    await client.set(`reset:${token}`, token); 
    await generateEmail(email, "Reset Password", "<h1>add generation code</h1>");
    res.status(200).json({
        "message" : "Successfully generated email"
    });
}

export default resetController