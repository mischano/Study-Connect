import express from "express";
import { sendFriendReq, getFriendReqs, updateFriendReq } from '../controllers/friendreq.js';

const router = express.Router();

router.post('/reqs', sendFriendReq);
router.get('/reqs/:id', getFriendReqs);
router.patch('/reqs/update/:id', updateFriendReq);

export default router;