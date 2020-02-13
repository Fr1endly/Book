import uuidv4 from 'uuid'
import models from '../models'
import express, { response } from 'express'
import User from '../models/User'
import { check, validationResults } from 'express-validator'

const router = express.Router();

router.get('/', (req, res) => {
    return res.send(Object.values(models.users));
  });

// @route POST api/users
// @desc Register user
// @access Public
//// IMPLEMENT PASSWORD HASHING 
router.post(
    '/',
    async (req, res) => {
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
            await user.save()
            res.json({msg: 'User successfully registered'})
        } catch(err) {
            console.error(err.message)
            res.status(500).send('Server error ')
        }
    }
);
router.get('/:userId', (req, res) => {
    return res.send(models.users[req.params.userId]);
});
router.delete('/:userId', (req, res) => {
    return res.send(
        `DELETE HTTP method on user/${req.params.userId} resource`,
    );
});

export default router