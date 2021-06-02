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

export const updateFriendReq = async (req, res) => {
   const { id: _id } = req.params;
   const newStatus = req.body.status;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No friend request with that id');
   } else {
      var updatedReq = await FriendReq.findByIdAndUpdate(_id,
         { status: newStatus }, { new: true });
      res.json(updatedReq);
   }
}