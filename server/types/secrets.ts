import dotenv from "dotenv"
dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET as string;
const JWT_HIRE_SECRET = process.env.JWT_HIRE_SECRET as string;
const MONGOOSE_URL = process.env.MONGODB_CONNECTION_STRING as string;
const JWT_MANAGER_EMAIL_SECRET = process.env.JWT_MANAGER_EMAIL_SECRET as string
export {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    MONGOOSE_URL,
    JWT_MANAGER_EMAIL_SECRET,
    JWT_RESET_SECRET,
    JWT_HIRE_SECRET
}