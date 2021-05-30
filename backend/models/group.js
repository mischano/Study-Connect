import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
   {
      name: { type: String },
      id: { type: String },
      posts: [{ type: String }],
      members: [{ type: String }]
   }
);

export default mongoose.model("Group", groupSchema);