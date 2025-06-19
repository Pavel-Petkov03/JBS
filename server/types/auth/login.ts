import { Response , Request} from "express";
import { IUser } from "../../models/user";
import UserRole from "./roleTypes";

interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

interface LoginResponsePayload{
    accessToken: string;
    message: string;
    user: IUser
  }
interface ErrorResponsePayload {
    error : string
}

type LoginResponse = Response<LoginResponsePayload | ErrorResponsePayload>

export {
    LoginRequest,
    LoginResponse,
    ErrorResponsePayload
}