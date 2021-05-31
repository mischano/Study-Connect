import express from "express";
import {
   signin,
   signup,
   updateClasses,
   getUser,
   getProfiles,
   updateGroups,
   updateFriends,
   leaveGroup,
   editName,
   editMajor,
} from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateClasses);
router.get('/users/:id', getUser);
router.get('/users', getProfiles);
router.patch('/groups/:id', updateGroups);
router.patch('/friends/:id', updateFriends);
router.patch('/groups/leave/:id', leaveGroup);
router.patch('/user/:id', editName);
router.patch('/users/:id', editMajor);

export default router;