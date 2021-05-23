import express from "express";
import { getGroup, makeGroup } from '../controllers/group.js'

const router = express.Router();

router.get('/:id', getGroup);
router.post('/groups', makeGroup);
export default router;