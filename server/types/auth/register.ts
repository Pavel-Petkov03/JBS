import { Request } from "express"
import { AuthRequest } from "./authenticateTokens";
interface RegisterCandidateRequest extends Request {
    body : {
        password : string,
        email : string,
        name : string,
    }
}

interface RegisterEmployerRequest extends RegisterCandidateRequest, AuthRequest{
    body: RegisterCandidateRequest['body'] & { companyName: string }; 
}

export {
    RegisterCandidateRequest,
    RegisterEmployerRequest
}