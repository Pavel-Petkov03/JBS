import express , {Response, Request, NextFunction} from "express"


import loginController from "../controllers/auth/registrationControllers/login";
import {registerCandidate} from "../controllers/auth/registrationControllers/register"
import refreshTokenCotroller from "../controllers/auth/registrationControllers/refreshToken";
import logoutCotroller from "../controllers/auth/registrationControllers/logout";


import { validateUser } from "../middlewares/validateRegisterCredentials";
import forgottenPasswordController from "../controllers/auth/registrationControllers/forgottenPassword";
import allowedToResetEntriesBuilder from "../middlewares/resetEntries";
import generateEmail from "../utils/generateEmail";
const router = express.Router()


const passwordResetMiddleware = allowedToResetEntriesBuilder<["email"]>("", ["email"], "email");

router.post("/refreshToken", refreshTokenCotroller)
router.post("/login", loginController);
router.post("/register", validateUser , registerCandidate)
router.post("/logout", logoutCotroller);
router.post("/forgot-password", passwordResetMiddleware ,forgottenPasswordController);
router.get("/forgot-password", passwordResetMiddleware, (req, res) => {
    res.status(200).json({
        "message" : "Successfully got to the page"
    });
});
router.post("/reset-password", async (req, res) => {
    const {email} = req.body;
    // trqbwa da validiram email predi tova(demek da vkaram edin middleware)
    // trqbva da generiram reset token i da go zashiq v redis
    // obache me murzi che imam lambda smqtane :(
    await generateEmail(email, "Reset Password", "<h1>add generation code</h1>");
    res.status(200).json({
        "message" : "Successfully generated email"
    });
});

export default router