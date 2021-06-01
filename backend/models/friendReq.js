import mongoose from 'mongoose';

const friendReqSchema = new mongoose.Schema({
   requester: {
      type: String,
      required: true
   },
   recipient: {
      type: String,
      required: true
   },
   status: {
      type: Number, // where 1 = requested, 2 = accepted, 3 = rejected
      required: true
   }
}, { collection : 'friendReqs' });

export default mongoose.model("FriendReq", friendReqSchema);