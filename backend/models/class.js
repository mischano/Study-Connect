import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
   department: { type: String, required: true },
   number: { type: Number, required: true },
   startTime: {type: Number, required: true },
   endTime: {type : Number, required: true }
});

export default mongoose.model("Class", classSchema);