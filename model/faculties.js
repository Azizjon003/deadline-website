const mongoose = require("mongoose");
const faculties = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Faculty name must be at least 3 characters"],
    maxlength: [50, "Faculty name must be at most 50 characters"],
  },
});

const Faculty = mongoose.model("Faculty", faculties);

module.exports = Faculty;
