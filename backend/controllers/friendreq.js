import FriendReq from '../models/friendReq.js';
import User from '../models/user.js';
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

export const getFriendReqs = async (req, res) => {
   const { id: _id } = req.params;
   try {
      const reqs = await FriendReq.find({ recipient: _id,
                                          status: 1 });
      res.json({ reqs });
   } catch (error) {
      console.log(error);
   }
}