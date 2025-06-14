import { generateResetToken } from "../../../utils/generateTokens";
import { Request, Response } from "express";
import generateEmail from "../../../utils/generateEmail";
import client from "../../../config/redis";
import htmlString from "../../../utils/templates/resetPasswrd";

async function resetController(req : Request, res : Response) {
    const {email} = req.body;
    const token = await generateResetToken(email);
    const replacers : Map<string, string> = new Map<string, string>(
            [
                ["link", `http://localhost:8000/auth/forgot-password?token=${token}`]
            ]
    );
    await generateEmail(email, `Reset Password`,
            htmlString,
            replacers
        );

    client.set(`reset:${email}`, token); 
    res.status(200).json({
        "message" : "Successfully generated email"
    });
}

export default resetController