import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { projectRoutes } from "./routes/project.routes.js";
import { loginRoutes } from "./routes/login.routes.js";

dotenv.config();

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public/temp"))

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());


app.get("/",(req, res) => {
  res.send("Welcome");
});

app.use("/api",projectRoutes)
app.use("/api/auth",loginRoutes)

// app.use("/api",projectRoutes)

// app.use("/api/v1/company", companyRoutes)
// app.use("/api/v1/intern", internRoutes)


export { app };
