const catchAsync = require("../utility/catchUser");
const AppError = require("../utility/appError");
const Deadline = require("../model/deadline");
const User = require("../model/user");
const getOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deadline = await Deadline.findOne({
    _id: id,
  }).populate("file");

  if (!deadline) {
    return next(new AppError("Deadline not found", 404));
  }
  console.log(deadline);
  const balance = req.user.balance;
  await User.updateOne(
    {
      _id: req.user.id,
    },
    {
      balance: balance - 1,
    }
  );

  res.download(deadline.file.path);
});

module.exports = {
  getOne,
};
