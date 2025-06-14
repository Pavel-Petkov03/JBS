import {mongoose} from "../config/mongoose"
export interface ICompany extends mongoose.Document {
    name: string;
    description: string;
    location: string;
    logoUrl: string;
    employees: mongoose.Types.ObjectId[];
    logoPublicId : string
  }


// ADMIN CREATES THE COMPANY AND ONLY PUTS NAME AND ONE EMPLOYER
// THE EMPLOYER ADDS DATA TO COMPANY
const companySchema = new mongoose.Schema<ICompany>({
    name: {type : String, required : true, unique : true},
    description: {type : String, required : false},
    location: {type : String, required : false},
    logoUrl: {type : String, required : false},
    logoPublicId : { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employer"}]
});

companySchema.path("employees").validate((employees: mongoose.Types.ObjectId[]) => {
  return employees.length > 0;
}, "A company must have at least one employer.");

export const Company = mongoose.model<ICompany>("Company", companySchema);