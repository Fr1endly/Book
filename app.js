import cors from "cors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import models, { connectDB } from "./models";
import userRoutes from "./routes/api";
import adminRoutes from "./routes/admin";

import seedDB from "./scripts/seedDB";

var app = express();
dotenv.config();

const db = connectDB();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//seedDB("loselose");

// ROUTES
// Users
app.use("/api/users", userRoutes.userRouter);
//  Auth
app.use("/api/auth", userRoutes.authRouter);
//  Chapters
app.use("/api/chapters", userRoutes.chaptersRouter);
// News
app.use("/api/news", userRoutes.newsRouter);
// Admin
app.use("/admin", adminRoutes);

module.exports = app;
