import FriendReq from '../models/friendReq.js';
import mongoose from 'mongoose';
import db from '../server.js';

export const sendFriendReq = async (req, res) => {
   const { requester, recipient, status } = req.body;
   var friendReqs = db.collection("friendReqs");

   try {
      const friendReq = await friendReqs.insertOne({ requester, recipient, status });
      res.json(friendReq.insertedId);
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}