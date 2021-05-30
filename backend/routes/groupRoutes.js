import express from "express";
import { getGroup, makeGroup, updatePosts, updateMembers, removeMember } from '../controllers/group.js'

const router = express.Router();

router.get('/:id', getGroup);
router.post('/groups', makeGroup);
router.patch('/posts/:id', updatePosts)
router.patch('/members/:id', updateMembers)
router.patch('/members/leave/:id', removeMember)
export default router;