import auth from '../middleware/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express, { response } from 'express'
import User from '../models/User'
import { check, validationResult } from 'express-validator'

const router = express.Router();

// @route GET api/users
// @desc Get list of all users
// @access Private, 
router.get('/', auth,
    async (req, res) => {
        // Check if authed user have admin rights
        try {
            const user = await User.findById(req.user.id)
            if (user.isAdmin) {
               const userList = await User.find().sort({ date: -1 })
               res.json(userList)
            } else {
                res.status(400).json({errors: [{msg: "Not authorized."}]})
            }
        } catch(err) {
            console.log(err.message)
            res.status(500).send('Server error')
        }
    }
)

// @route POST api/users
// @desc Register user
// @access Public
router.post(
    '/', [
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Please provide valid email.').isEmail(),
        check('password', 'Enter password with 8 or more characters.')
            .isLength({ min: 6})
        
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try { 
            let user = await User.findOne({ email })
            if (user) {
                return res
                .status(400)
                .json({ errors: [{msg: 'User already exists'}]})
            }

            user = new User ({
                name,
                email,
                password
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save();

            const payload = { 
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )
        } catch(err) {
            console.error(err.message)
            res.status(500).send('Server error ')
        }
    }
);

export default router