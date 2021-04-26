const mongoose = require("mongoose");
const Schema = require("mongoose");

const profileSchema = new mongoose.Schema({
   user: String,
   pass: String,
   college: String,
   major: String,
   friends: [{ type: Schema.Types.ObjectId, ref: 'Profile'}],
   classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;