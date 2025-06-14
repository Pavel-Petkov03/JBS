import express  from "express"


import loginController from "../controllers/auth/registrationControllers/login";
import {registerCandidate} from "../controllers/auth/registrationControllers/register"
import refreshTokenCotroller from "../controllers/auth/registrationControllers/refreshToken";
import logoutCotroller from "../controllers/auth/registrationControllers/logout";

import { validateUser } from "../middlewares/validateRegisterCredentials";
import {forgottenPasswordGetController, forgottenPasswordPostConstroller} from "../controllers/auth/registrationControllers/forgottenPassword";
import  generateTokenGateDecorator from "../middlewares/resetEntries";
import generateEmail from "../utils/generateEmail";
import { generateResetToken } from "../utils/generateTokens";

const router = express.Router()


const passwordResetMiddleware = generateTokenGateDecorator("reset")<["email"]>("", ["email"], "email");

router.post("/refreshToken", refreshTokenCotroller);
router.post("/login", loginController);
router.post("/register-candidate", validateUser , registerCandidate);
router.post("/register-employer", )
router.post("/logout", logoutCotroller);
router.post("/forgot-password", passwordResetMiddleware ,forgottenPasswordPostConstroller);
router.get("/forgot-password", passwordResetMiddleware, forgottenPasswordGetController);
router.post("/reset-password", async (req, res) => {
    const {email} = req.body;
    const token = await generateResetToken(email);
    await generateEmail(email, "Reset Password", "<h1>add generation code</h1>");
    res.status(200).json({
        "message" : "Successfully generated email"
    });
});

export default router