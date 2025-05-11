import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/login.route.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://basic-auth-ermuxan7s-projects.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
  connectDB();
});
