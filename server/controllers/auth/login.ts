import bcrypt from "bcrypt"
import { User } from "../../models/user";
import serverErrorHandler from "../../utils/serverErrorHandler";
import { LoginRequest, LoginResponse } from "../../types/auth/login";
import { generateAccessToken, setRefreshToken } from "../../utils/generateTokens";

const login = serverErrorHandler(async (req : LoginRequest, res : LoginResponse) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email : email });
    if (!user) {
        res.status(404).json({
            error: "User not found"
        });
        return;
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({
             error: "Invalid password"
        });
        return;
    }
    const accessToken = generateAccessToken(user.id);
    await setRefreshToken(res, user.id);
    res.json({
        accessToken,
        message: "Successfully logged in"
    });
    return;
})

export default login