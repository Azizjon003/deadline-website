const catchAsync = require("../utility/catchUser");
const AppError = require("../utility/appError");
const Deadline = require("../model/deadline");
const getOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deadline = await Deadline.findOne({
    _id: id,
  }).populate("file");

  if (!deadline) {
    return next(new AppError("Deadline not found", 404));
  }
  console.log(deadline);

  res.download(deadline.file.path);
});

module.exports = {
  getOne,
};
