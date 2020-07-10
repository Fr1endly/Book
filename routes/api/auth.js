import express, { Router } from "express";
import { check, validationResult } from "express-validator";
import auth from "../../middleware/auth";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bigInt from "big-integer";

const router = Router();

// @route GET api/auth
// @desc Get user by token
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please provide valid email.").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }
      if (!user.isActive) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User is not activated by admin." }] });
      }
      user.lastLoginDate = Date.now();
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 18000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Route api/auth/reset
// Desc check for user email and send password reset link
// Acc Public
router.post(
  "/reset",
  [check("email", "Please provide valid email.").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rollnroleofficial@gmail.com",
        pass: "Oskar007",
      },
    });

    try {
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
      }

      const ident = parseInt(user.name, 36);
      console.log(ident, ident.toString(36));
      const time = new Date().getTime().toString(36);

      const string = `${user._id}${user.lastLoginDate}${user.password}`;
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(string, salt);

      var mailOptions = {
        from: "rollnroleofficial@gmail.com",
        to: "rollnroleofficial@gmail.com",
        subject: "Password reset",
        text: `Password reset link: http://localhost:3000/api/auth/reset/${ident}/${time}-${hash}`,
      };

      const info = await transporter.sendMail(mailOptions);

      res.json({ msg: `Message sent: ${info.messageId}` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// route api/auth/reset/:ident/:time-:hash
// desc Validate link and on success send new randomized password
// acc public
router.get("/reset/:ident/:time-:hash", async (req, res) => {
  const { ident, time, hash } = req.params;

  const serverTime = new Date().getTime();
  const dayTimeSeconds = 86400000;

  if (serverTime - parseInt(time, 36) > dayTimeSeconds) {
    res.status(400).json({ errors: [{ msg: "Outdated link." }] });
  }

  const name = Number(ident).toString(36);

  try {
    const user = await User.findOne({ name });
    if (!user) {
      res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const str = `${user._id}${user.lastLoginDate}${user.password}`;
    const isMatch = await bcrypt.compare(str, hash);

    if (!isMatch) {
      res.status(400).json({ errors: [{ msg: "Invalid link" }] });
    }

    res.json({ msg: "Success." });
  } catch (error) {
    console.log(error);
  }
});

export default router;
