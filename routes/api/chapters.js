import auth from "../../middleware/auth";
import { check, validationResult } from "express-validator";
import models from "../../models";
import { Router } from "express";
import Chapter from "../../models/Chapter";
const router = Router();

// @@Route GET api/chapters
// @@Desc Get all chapters
// @@Access Private
router.get("/", auth, async (req, res) => {
  try {
    const chapterList = await Chapter.find({});
    res.json(chapterList);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong with finding chapters" });
  }
});

// @@Route GET api/chapters/:chapterID
// @@Desc GET chapter by id
// @@Access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    console.log(chapter);
    res.json(chapter);
  } catch (error) {
    if (error) {
      console.error(error.message);
    }
  }
});

// @@ Route POST api/chapters.
// @@Desc Save new chapter to DB.
// @@Access Private
router.post(
  "/",
  [check("title", "Title is required").not().isEmpty()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, index, sections } = req.body;

    try {
      let chapter = await Chapter.findOne({ title });
      if (chapter) {
        return res
          .status(409)
          .json({ errors: [{ msg: "This title already taken." }] });
      }

      chapter = new Chapter({
        title,
        index,
        sections,
      });

      await chapter.save();
      res.json(chapter);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error.");
    }
  }
);

router.post("/:id", async (req, res) => {
  const { title, index, sections } = req.body;
  const id = req.params.id;

  try {
    await Chapter.findOneAndUpdate(
      { _id: id },
      { $set: { title, index, sections } },
      { new: true }
    );

    res.json({ msg: "Success" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:chapterId", (req, res) => {
  const { [req.params.chapterId]: chapter, ...rest } = models.chapters;

  models.chapters = rest;
  res.send(chapter);
});

export default router;
