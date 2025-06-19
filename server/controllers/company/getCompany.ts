import { Request, Response } from "express";
import { CompanyModel } from "../../models/company";

export const getCompany = async (req: Request, res: Response) => {
    const company = await CompanyModel.findById(req.params.companyId)
      .populate("employees", "name email role")
      .lean();

    if (!company) {
      res.status(404).json({ error: "Company not found" });
      return
    }

    res.json(company);
}

