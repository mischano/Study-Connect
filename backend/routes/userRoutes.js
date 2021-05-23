import express from "express";
import {
   signin,
   signup,
   updateClasses,
   getUser,
   getProfiles,
   updateGroups,
   sendFriendReq
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateClasses);
router.get('/users/:id', getUser);
router.get('/users', getProfiles);
router.patch('/groups/:id', updateGroups);
router.get('/friendreqs', sendFriendReq);

export default router;