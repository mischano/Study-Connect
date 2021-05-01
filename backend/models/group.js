const mongoose = require("mongoose");
const Schema = require("mongoose");

const groupSchema = new mongoose.Schema(
    {
    participants: [{ type: Schema.Types.ObjectId, ref: 'Profile'}]
});

export default mongoose.model("Profile", groupSchema);