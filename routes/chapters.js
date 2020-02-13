import uuidv4 from 'uuid'
import models from '../models'
import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(models.chapters));
  })

router.get("/:chapterId", (req, res) => {
    return res.send(models.chapters[req.params.chapterId]);
});

router.post("/", (req, res) => {
    const id = uuidv4()
    const chapter = {
      id,
      title: req.body.title,
      userId: req.me.id,
      sections: req.body.sections,
    }
    models.chapters[id] = chapter
    res.send(chapter)
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