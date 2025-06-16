import express from "express"
import authRouter from "./routes/auth"
import bodyParser from "body-parser"
import cookieParser  from "cookie-parser"
import jobRouter from "./routes/jobs"
const app = express(); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/job", jobRouter);
app.listen(8000, () => {
    console.log("Listening");
});