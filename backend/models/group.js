import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
    {
        name: { type: String },
        id: { type: String },
        posts: [],
        numMembers: { type: Number}
    }
);

export default mongoose.model("Group", groupSchema);