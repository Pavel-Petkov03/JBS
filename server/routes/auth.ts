import express  from "express"

import loginController from "../controllers/auth/login";
import {registerCandidateController, registerEmployerGetController, registerEmployerPostController} from "../controllers/auth/register"
import refreshTokenCotroller from "../controllers/auth/refreshToken";
import logoutCotroller from "../controllers/auth/logout";

import { validateUser } from "../middlewares/validateRegisterCredentials";
import {forgottenPasswordGetController, forgottenPasswordPostConstroller} from "../controllers/auth/forgottenPassword";
import  generateTokenGateDecorator from "../middlewares/resetEntries";
import resetController from "../controllers/auth/resetPassword";

import { JWT_RESET_SECRET , JWT_HIRE_SECRET} from "../types/auth/secrets";

const router = express.Router();


const passwordResetSendEmailMiddleware = generateTokenGateDecorator("reset")(JWT_RESET_SECRET, ["email"], "email");
const registerEmployerSendEmailMiddleware = generateTokenGateDecorator("hire")(JWT_HIRE_SECRET, ["email", "companyName"], "email");

router.post("/refreshToken", refreshTokenCotroller);
router.post("/login", loginController);
router.post("/register-candidate", validateUser , registerCandidateController);
router.post("/register-employer", registerEmployerSendEmailMiddleware, registerEmployerPostController);
router.get("/register-employer", registerEmployerSendEmailMiddleware, registerEmployerGetController);
router.post("/logout", logoutCotroller);
router.post("/forgot-password", passwordResetSendEmailMiddleware ,forgottenPasswordPostConstroller);
router.get("/forgot-password", passwordResetSendEmailMiddleware, forgottenPasswordGetController);
router.post("/reset-password", resetController);

export default router