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
      type: int, // where 1 = requested, 2 = accepted, 3 = rejected
      required: true
   }
});

export default mongoose.model("FriendReq", friendReqSchema);