import {mongoose} from "../config/mongoose"
export interface IUser extends mongoose.Document {
    name : string,
    email : string,
    password : string,
    role : "Admin" | "Employer" | "Candidate"
};

export interface IEmployer extends IUser {
    isCompanyManager : boolean,
    company: mongoose.Types.ObjectId
};


const UserSchema = new mongoose.Schema<IUser>({
    name : {type : String, required : true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    role: { type: String, enum: ["Admin", "Employer", "Candidate"], required: true,},
});

const EmployerSchema = new mongoose.Schema<IEmployer>({
    isCompanyManager : {type : Boolean, default : false},
    company : {type : mongoose.Schema.Types.ObjectId, ref : "Company", required : true}
});

export const User = mongoose.model<IUser>("User", UserSchema);
export const Employer = User.discriminator<IEmployer>("Employer", EmployerSchema);