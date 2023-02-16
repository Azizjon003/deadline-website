const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "File name must be at least 3 characters"],
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
