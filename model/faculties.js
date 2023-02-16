const mongoose = require("mongoose");
const faculties = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, "Faculty name must be at most 50 characters"],
  },
});

const Faculty = mongoose.model("Faculty", faculties);

module.exports = Faculty;
