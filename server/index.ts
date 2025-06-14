import express from "express"
import authRouter from "./routes/auth"
import bodyParser from "body-parser"
import cookieParser  from "cookie-parser"
const app = express(); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.listen(8000, () => {
    console.log("Listening");
});