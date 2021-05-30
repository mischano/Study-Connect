import express from "express";
import { getPost, makePost, updateComments } from '../controllers/post.js'

const router = express.Router();

router.get('/:id', getPost);
router.post('/posts', makePost);
router.patch('/comments/:id', updateComments)

export default router;