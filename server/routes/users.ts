import express  from "express"

import loginController from "../controllers/auth/registrationControllers/login";
import {registerCandidate} from "../controllers/auth/registrationControllers/register"
import refreshTokenCotroller from "../controllers/auth/registrationControllers/refreshToken";
import logoutCotroller from "../controllers/auth/registrationControllers/logout";

import { validateUser } from "../middlewares/validateRegisterCredentials";
import {forgottenPasswordGetController, forgottenPasswordPostConstroller} from "../controllers/auth/registrationControllers/forgottenPassword";
import  generateTokenGateDecorator from "../middlewares/resetEntries";
import resetController from "../controllers/auth/registrationControllers/resetPassword";
import { JWT_RESET_SECRET } from "../types/auth/secrets";

const router = express.Router()


const passwordResetMiddleware = generateTokenGateDecorator("reset")<["email"]>(JWT_RESET_SECRET, ["email"], "email");

router.post("/refreshToken", refreshTokenCotroller);
router.post("/login", loginController);
router.post("/register-candidate", validateUser , registerCandidate);
router.post("/register-employer", )
router.post("/logout", logoutCotroller);
router.post("/forgot-password", passwordResetMiddleware ,forgottenPasswordPostConstroller);
router.get("/forgot-password", passwordResetMiddleware, forgottenPasswordGetController);
router.post("/reset-password", resetController);

export default router