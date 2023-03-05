const mongoose = require("mongoose");
const Science = require("./science");
const File = require("./files");
const Course = require("./course");
const deadlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Course,
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

deadlineSchema.pre(/^find/, function (next) {
  this.populate({
    path: "fan",
    select: "name",
  });
  next();
});

deadlineSchema.pre("save", async function (next) {
  console.log("Will save document...");
  console.log(this);
  const data = await Science.findOne({ _id: this.fan });
  const file = await File.findOne({ _id: this.file });
  const kurs = await Course.findOne({ _id: this.course });

  if (!data) {
    return next(new Error("Science not found"));
  }
  if (!file) {
    return next(new Error("File not found"));
  }
  if (!kurs) {
    return next(new Error("Kurs not found"));
  }
  next();
});
const Deadline = mongoose.model("Deadline", deadlineSchema);

module.exports = Deadline;
