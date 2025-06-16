import { AuthRequest } from "./authenticateTokens"
import { Request } from "express";

export default interface EmployerAuthorisedRequest extends AuthRequest, Request{
    body : {
        companyName : string;
    }
}