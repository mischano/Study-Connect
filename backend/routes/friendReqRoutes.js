import express from "express";
import { sendFriendReq, getFriendReqs } from '../controllers/friendreq.js';

const router = express.Router();

router.post('/reqs', sendFriendReq);
router.get('/reqs/:id', getFriendReqs);

export default router;