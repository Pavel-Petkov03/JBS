import express , {Response, Request, NextFunction} from "express"


import loginController from "../controllers/auth/registrationControllers/login";
import {registerCandidate} from "../controllers/auth/registrationControllers/register"
import refreshTokenCotroller from "../controllers/auth/registrationControllers/refreshToken";
import logoutCotroller from "../controllers/auth/registrationControllers/logout";


import { validateUser } from "../middlewares/validateRegisterCredentials";
import forgottenPasswordController from "../controllers/auth/registrationControllers/forgottenPassword";
import allowedToResetEntriesBuilder from "../middlewares/resetEntries";
const router = express.Router()


const passwordResetMiddleware = allowedToResetEntriesBuilder<["email"]>("", ["email"], "email");

router.post("/refreshToken", refreshTokenCotroller)
router.post("/login", loginController);
router.post("/register", validateUser , registerCandidate)
router.post("/logout", logoutCotroller);
router.post("/forgot-password", passwordResetMiddleware ,forgottenPasswordController);
router.get("/reset-password");
router.post("/reset-password");

export default router