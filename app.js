import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import models, { connectDB } from './models'
import uuidv4 from 'uuid'
import routes from './routes'
import User from './models/User'
import Chapter from './models/Chapter'

var app = express();
dotenv.config();

const db = connectDB()

app.use(logger("dev"));
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
//  Chapters
app.use('/api/chapters', routes.chaptersRouter)
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
