const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
   department: String,
   number: Number,
   startTime: Number,
   endTime: Number
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;