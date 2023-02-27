const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchUser");
const Deadline = require("../model/deadline");

const getAll = catchAsync(async (req, res, next) => {
  const deadline = await Deadline.find({
    active: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      deadline,
    },
  });
});

const getOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const deadline = await Deadline.find({
    _id: id,
  }).populate("science");
});

const create = catchAsync(async (req, res, next) => {
  const deadline = await Deadline.create(req.body);
  res.status(200).json({
    status: "success",
    message: "Deadline confirm for Admins",
    data: deadline,
  });
});

const update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const file = await File.findOne({ _id: id });
  if (!file) {
    return next(new AppError("File not found", 404));
  }
  const name = req.body.name || file.name;
  const course = req.body.course || file.course;
  const science = req.body.science || file.science;

  const deadline = await Deadline.updateOne(
    {
      _id: id,
    },
    {
      name,
      course,
      science,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Deadline updated",
    data: deadline,
  });
});

module.exports = {
  getAll,
  getOne,
  create,
  update,
}
