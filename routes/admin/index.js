import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import express, { response } from "express";
import User from "../../models/User";
import { check, validationResult } from "express-validator";

const router = express.Router();

// @@route POST api/admin/users
// @@desc Create or Edit user
// @@access Private, authorization protected

router.post(
  "/users",
  [auth],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      date,
      lastLoginDate,
      isActive,
      isAdmin,
      id // Edited user ID
    } = req.body;
    const userFields = {
      name,
      email,
      date: date ? date : Date.now(),
      lastLoginDate,
      isActive,
      isAdmin
    };

    try {
      //Check if client has admin rights
      const currentUser = await User.findById(req.user.id); //Authorized user ID
      if (!currentUser.isAdmin) {
        return res.status(400).json({ errors: [{ msg: "Not authorized." }] });
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);
      }

      await User.findOneAndUpdate(
        { _id: id },
        { $set: userFields },
        { new: true, upsert: true }
      );
      res.json({ msg: "Success" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @@route GET api/admin/users/:userId
// @@desc Create or Edit user
// @@access Private, authorization protected

router.get("/users/:userId");

export default router;
