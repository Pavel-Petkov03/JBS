import { NextFunction, Request, Response } from "express";
import hasRoles from "./hasRole";
import UserRole from "../types/auth/roleTypes";
import { CompanyModel } from "../models/company";
import { AuthRequest } from "../types/auth/authenticateTokens";



async function isEmployerInCompany(req: AuthRequest, res: Response, next: NextFunction) {
    const { companyName } = req.body;
    if(!req.user){
        res.status(403).json({ 
            message: 'You are not authorized for this company' 
        });
        return;
    }
    
    const company = await CompanyModel.findOne({
            name: companyName,
            employees: req.user._id
        }).select('name description logoUrl').lean();
        
    if (!company) {
        res.status(404).json({ message: 'Company not found' });
        return;
    }
    next();
}





export default isEmployerInCompany