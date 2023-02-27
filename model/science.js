const mongoose = require("mongoose");
const scienceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Science = mongoose.model("Fan", scienceSchema);

module.exports = Science;
