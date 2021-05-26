import express from "express";
import { sendFriendReq } from '../controllers/friendreq.js';

const router = express.Router();

router.post('/reqs', sendFriendReq);

export default router;