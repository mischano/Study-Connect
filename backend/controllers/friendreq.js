import FriendReq from '../models/friendReqs.js';
import db from '../server.js';
import mongoose from 'mongoose';

export const getFriendReqs = async (req, res) => {
   const friendReqs = await FriendReq.find({ _recipient: })
}