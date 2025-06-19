import express from "express"
import authRouter from "./routes/auth"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser  from "cookie-parser"
import jobRouter from "./routes/jobs"
const app = express(); 

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // This is the key to solving the issue
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie', 'Authorization'],
};


app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use("/auth", authRouter);
app.use("/jobs", jobRouter);
app.listen(8000, () => {
    console.log("Listening");
});