import auth from '../middleware/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express, { response } from 'express'
import User from '../models/User'
import { check, validationResult } from 'express-validator'

const router = express.Router();

// @@route POST api/admin/user
// description