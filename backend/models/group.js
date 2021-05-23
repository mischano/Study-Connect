import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
    {
        name: { type: String },
        id: { type: String },
        posts: [],
        numMembers: { type: Number},
        members: [{ type: String }]
    }
);

export default mongoose.model("Group", groupSchema);