import { TokenRequest } from "../../../types/auth/authenticateTokens";
import serverErrorHandler from "../../../utils/serverErrorHandler";
import { User } from "../../../models/user";
import bcrypt from "bcrypt"
import { Response } from "express";

const forgottenPassword = serverErrorHandler(
    async (req : TokenRequest<["email"]> & {body : {password : string}}, 
        res : Response) => {
    const {password, verifiedEntries} = req.body;
    const email = verifiedEntries.email;
    const user = await User.findOneAndUpdate(
        {email}, 
        {password : bcrypt.hash(password, 10)}
    );
    if(!user){
        res.status(404).json({
            error : "There is no user with sucvh email"
        });
        return;
    }
    res.status(200).json({
        message : "Successfully updated password"
    });
    return;
});


export default forgottenPassword

