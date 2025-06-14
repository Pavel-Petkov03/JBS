import serverErrorHandler from "../../utils/serverErrorHandler";
import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { JWT_MANAGER_EMAIL_SECRET } from "../../types/auth/secrets";
import generateEmail from "../../utils/generateEmail";
import { User } from "../../models/user";
import { ErrorResponsePayload } from "../../types/auth/login";


// this endpoint sends email to manager employer
const registerManager = serverErrorHandler(async (req : Request, res : Response<ErrorResponsePayload | {message : string}>) => {
    // todo create html for email and add html to string implementation
    //todo
    const {email, companyName} = req.body;
    const userWithMatchingEmail = await User.findOne({email : email});
    if(userWithMatchingEmail){
        res.status(400).json({
            "error" : "There is user with such email"
        });
        return;
    }
    const resetToken = jwt.sign({email, companyName}, JWT_MANAGER_EMAIL_SECRET);
    const replacers : Map<string, string> = new Map<string, string>(
        [
            ["link", `http://localhost:8000/auth/password-reset?token=${resetToken}`]
        ]
    );
    await generateEmail(email, `Create Manager Employer Account for ${companyName}`,
        `<p>Activation link for profile: {{link}} </p>`,
        replacers
    );

    res.status(201).json({
        "message" : "Successfully generated email for manager registration"
    });
    return;
});


export default registerManager