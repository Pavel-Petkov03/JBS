import { CompanyModel } from "../../models/company";
import { Request, Response } from "express";

export const getAllCompanies = async (req: Request, res: Response) => {
  
    const companies = await CompanyModel.find();
    res.status(200).json(companies);
};