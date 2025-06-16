import { AuthRequest } from "./auth/authenticateTokens";

export interface FileUploadRequest extends AuthRequest {
  file: Express.Multer.File; // Required when using upload middleware
}
