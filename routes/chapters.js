import uuidv4 from 'uuid';
import models from '../models';
import { Router } from 'express';
import Chapter from '../models/Chapter'
const router = Router();

router.get('/', async (req, res) => {
    try{
      const chapters = await Chapter.find().sort({ index: +1 })
      res.json(chapters)
    } catch(err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }
  })

router.get("/:chapterId", (req, res) => {
    return res.send(models.chapters[req.params.chapterId]);
});

router.post("/", 
  async (req, res) => {
    const { title, index, sections } = req.body

    try{
      let chapter = await Chapter.findOne({ title })
      if (chapter) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'This title already taken.'}]})
      }

      chapter = new Chapter({
        title,
        index,
        sections
      })
      await chapter.save()
      res.json(chapter)
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error.')

    }

  });
router.put("/:chapterId", (req, res) => {
    const id = req.params.chapterId
    const {
        [id]: chapter
    } = models.chapters
    chapter.title = req.body.title
    chapter.userId = req.body.userId
    chapter.sections = req.body.sections

    res.send(chapter)
});

router.delete("/:chapterId", (req, res) => {
    const {
        [req.params.chapterId]: chapter,
        ...rest
    } = models.chapters;

    models.chapters = rest
    res.send(chapter)
});

export default router