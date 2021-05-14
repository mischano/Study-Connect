import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   name: { type: String, required: true},
   email : { type: String, required: true},
   password : { type: String, required: true},
   id: { type: String },
   major: { type: String, required: true},
   gradDate: { type: String, required: true},
   friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
   classes: []
});

export default mongoose.model("User", userSchema);