import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
   name: { type: String, required: true},
   email : { type: String, required: true},
   password : { type: String, required: true},
   id: { type: String }
 //  major: String,
 //  friends: [{ type: Schema.Types.ObjectId, ref: 'Profile'}],
  // classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }]
});

export default mongoose.model("Profile", profileSchema);

//const Profile = mongoose.model("Profile", profileSchema);
//module.exports = Profile;