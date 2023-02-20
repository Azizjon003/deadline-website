const mongoose = require("mongoose");
const deadlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
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
    required: true,
  },
});

const Deadline = mongoose.model("Deadline", deadlineSchema);
module.exports = Deadline;
