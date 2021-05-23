const mongoose = require("mongoose");
const Schema = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'Profile' },
    content: String,
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
    created_at: {type: Date, default: Date.now}
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;