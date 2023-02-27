const mongoose = require("mongoose");
const deadlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
  science: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Sciences",
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Files",
  },
  active: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Deadline = mongoose.model("Deadline", deadlineSchema);
module.exports = Deadline;
