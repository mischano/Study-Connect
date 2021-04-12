const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
   user: String,
   pass: String,
   college: String,
   major: String,
   friends: [String]
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;