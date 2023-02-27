const mongoose = require("mongoose");
const Science = require("./science");
const File = require("./files");
const deadlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      enum: ["1", "2", "3", "4"],
      required: true,
    },
    fan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Science,
    },
    file: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "File",
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

deadlineSchema.pre("save", async function (next) {
  console.log("Will save document...");
  console.log(this);
  const data = await Science.findOne({ _id: this.fan });
  const file = await File.findOne({ _id: this.file });

  if (!data) {
    return next(new Error("Science not found"));
  }
  if (!file) {
    return next(new Error("File not found"));
  }
  next();
});
const Deadline = mongoose.model("Deadline", deadlineSchema);

module.exports = Deadline;
