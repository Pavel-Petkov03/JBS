import mongoose from "mongoose";
import { MONGOOSE_URL } from "../types/secrets";
mongoose
    .connect(MONGOOSE_URL)
    .then( () => {
        console.log("[CONNECTED TO DATABASE SUCCESSFULLY]");
    }).catch((error) => {
        console.log("[DATABASE CONNECTION ERROR]:", error.message);
    });

export {
    mongoose
};