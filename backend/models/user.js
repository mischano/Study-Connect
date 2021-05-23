import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   id: { type: String },
   bio: { type: String },
   major: { type: String, required: true },
   gradDate: { type: String, required: true },
   friends: [{ type: String }],
   classes: [],
   groups: [{ type: String }]
});

export default mongoose.model("User", userSchema);