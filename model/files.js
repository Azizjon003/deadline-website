const mongoose = require("mongoose");
const User = require("./user");
const fileSchema = new mongoose.Schema(
  {
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

    createdWho: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

fileSchema.pre("save", async function (next) {
  console.log("Will save document...");
  console.log(this);
  const data = await User.findOne({ _id: this.createdWho });
  if (!data) {
    return next(new Error("User not found"));
  }
  next();
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
