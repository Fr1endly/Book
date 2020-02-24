import cors from 'cors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import models, { connectDB } from './models'
import routes from './routes'

var app = express();
dotenv.config();

const db = connectDB()

app.use(logger("dev"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next)=>{
  req.me = models.users[1];
  next();
})


// ROUTES
// Users
app.use('/api/users', routes.userRouter)
//Auth
app.use('/api/auth', routes.authRouter)
//  Chapters
app.use('/api/chapters', routes.chaptersRouter)

module.exports = app;
