const mongoose = require("mongoose");
const Schema = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
    participants: [{ type: Schema.Types.ObjectId, ref: 'Profile'}]
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;