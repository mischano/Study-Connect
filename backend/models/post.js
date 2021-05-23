const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   title: String,
   message: String,
   creator: String,
   comments: [],
   likeCount: {
      type: Number,
      default: 0
   },
   created_at: { type: Date, default: new Date() }
});

const Post = mongoose.model("Post", postSchema);

export default Post;