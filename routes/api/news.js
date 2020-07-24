import auth from "../../middleware/auth";
import { check, validationResult } from "express-validator";
import { Router } from "express";
import mongoose from "mongoose";
import News from "../../models/News";
import User from "../../models/User";
const router = Router();

// @@Route GET api/news
// @@Desc Get all News posts
// @@Access Private
router.get("/", auth, async (req, res) => {
  try {
    const newsList = await News.find({});
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @@Route GET api/news
// @@Desc Get all News posts
// @@Access Private
router.get("/:title", async (req, res) => {
  try {
    const newsItem = await News.findOne({ title: req.params.title });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// @@ Route POST api/news.
// @@Desc Save new News post to DB.
// @@Access Private
router.post(
  "/",
  [
    check("title", "Title is required and must be unique").not().isEmpty(),
    check("text", "Can't be empty message"),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text } = req.body;

    try {
      let newsPost = await News.findOne({ title });
      if (newsPost) {
        return res
          .status(409)
          .json({ errors: [{ msg: "This title already taken." }] });
      }

      const user = await User.findById(req.user.id).select("-password");

      const date = Date.now();
      const comments = [];

      newsPost = new News({
        title,
        author: user.name,
        text,
        comments,
        date,
      });

      await newsPost.save();
      res.send("Success");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error.");
    }
  }
);

export default router;
