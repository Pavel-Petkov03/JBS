
import bcrypt from "bcrypt"
import {Request, Response} from "express"
import { Employer, User } from "../../../models/user"
import serverErrorHandler from "../../../utils/serverErrorHandler"
import {generateAccessToken, setRefreshToken } from "../../../utils/generateTokens"
import { RegisterCandidateRequest, RegisterEmployerRequest } from "../../../types/auth/register"
import { TokenRequest } from "../../../types/auth/authenticateTokens"
import { Company } from "../../../models/company"
import { ErrorResponsePayload } from "../../../types/auth/login"

const registerCandidate = serverErrorHandler(async (req : RegisterCandidateRequest, res : Response) =>  {
    const {password , email , name} = req.body;
    try{
        const user = new User({ 
            password : await bcrypt.hash(password, 10),
            name,
            email,
            role : "Candidate"
        });
        await user.save();
        await setRefreshToken(res, user.id);
        res.status(200).json({
            message : "Successfully registed",
            accessToken : generateAccessToken(user.id)
        });
    }catch(error) {
        res.status(400).json({
            error : "User already exists",
        })
        return;
    }
});



// before that have to validate reset token
const registerEmployer = serverErrorHandler(
    async (req : TokenRequest<["email", "companyName"]> & {body : {password : string, name : string}}, 
        res : Response<ErrorResponsePayload | {message : string}>
    ) => {
    // 
    // this endpoint runs when the employer has filled all the data
    // after employer created from the admin[check admin register manager]
    // 

    const {password, name, verifiedEntries} = req.body;
    const {email, companyName} = verifiedEntries;
    const currentCompany = await Company.findOne({name : companyName});
    if(!currentCompany){
        res.status(404).json({
            error : "There is no company with such name"
        });
        return;
    }
    try{
        const currentEmployer = new Employer({
            email,
            password,
            name,
            company : currentCompany.id,
        });
        await currentEmployer.save();
        res.status(201).json({
            "message" : "Successfully created employer"
        });
        return;
    }catch(error){
        res.status(400).json({
            "error" : "There is employer with such email"
        });
    }
 })


export {
    registerEmployer,
    registerCandidate
}