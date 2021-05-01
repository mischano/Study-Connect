import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   name: { type: String, required: true},
   email : { type: String, required: true},
   password : { type: String, required: true},
   id: { type: String },
   major: { type: String, required: true},
   school: { type: String, required: true},
   gradDate: { type: String, required: true},
   friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
   classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
});

export default mongoose.model("User", userSchema);