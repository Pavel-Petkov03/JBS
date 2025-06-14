import serverErrorHandler from "../../../utils/serverErrorHandler";
import { Request, Response } from "express";
import { Company } from "../../../models/company";
import { body } from 'express-validator';
import validator from "../../../middlewares/expressValidatorValidate";
import { Employer} from "../../../models/user";

const validateCompanyEntries = [
    body('name')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('name must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('name can only contain letters, numbers, and underscores'), 
    validator
]

const createCompany = serverErrorHandler(async (req : Request, res : Response) => {
    const {companyName, email} = req.body;
    if(!email){
        res.status(404).json({
            "error" : "There is no employer with such email"
        });
        return;
    }
    const employer = await Employer.findOne({email});
    if(!employer){
        res.status(404).json({
            "error" : "There is no employer with such email"
        });
        return;
    }
    const currentCompany = new Company({
        name : companyName,
        employees  : [employer.id]
    });
    await currentCompany.save();
    res.status(200).json({
        "message" : "Sucessfully created company",
    });
    return;
});

const createCompanyController = [validateCompanyEntries, createCompany];
export default createCompanyController;
