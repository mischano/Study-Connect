import express from "express";
import { getComment, makeComment } from '../controllers/comment.js'

const router = express.Router();

router.get('/:id', getComment);
router.post('/comments', makeComment);

export default router;