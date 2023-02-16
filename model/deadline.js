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
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
