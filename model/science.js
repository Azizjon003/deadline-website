const mongoose = require("mongoose");
const scienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Science = mongoose.model("Science", scienceSchema);

module.exports = Science;
