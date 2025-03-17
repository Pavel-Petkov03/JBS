import { Response , Request} from "express";

interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

interface LoginResponsePayload{
    accessToken: string;
    message: string;
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