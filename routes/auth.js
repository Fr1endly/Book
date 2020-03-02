import express, { Router } from 'express';
import { check, validationResult } from 'express-validator'
import auth from '../middleware/auth'
import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = Router();

// @route GET api/auth
// @desc Get user by token
// @access private
router.get('/', auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            console.log(req.user)
            res.json(user)
        } catch(err) {
            console.error(err.message)
            res.status(500).send('Server error.')
        }
    }
)


// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', [
    check('email', 'Please provide valid email.').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ errors: [{msg: 'Invalid credentials.'}]})
        }
        if (!user.isActive) {
            return res.status(400).json({ errors: [{ msg: 'User is not activated by admin.'}]})
        }
        user.lastLoginDate = Date.now()
        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token)=>{
                if (err) throw err;
                res.json({ token})
        });
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

export default router