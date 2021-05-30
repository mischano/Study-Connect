import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
   message: String,
   creator: String,
   created_at: { type: Date, default: new Date() }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;