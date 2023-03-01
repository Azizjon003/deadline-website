const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchUser");
const Deadline = require("../model/deadline");
const File = require("../model/files");

const getAll = catchAsync(async (req, res, next) => {
  const deadline = await Deadline.find({
    active: true,
  }).select("-file -active");
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
  });
  res.status(200).json({
    status: "success",
    data: deadline,
  });
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

const myUploadDeadlines = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const files = await File.find({
    createdWho: id,
  }).select("_id");
  console.log(files);

  const deadlines = await Deadline.find({
    file: { $in: files },
  }).select("name course fan");

  res.status(200).json({
    status: "success",
    data: deadlines,
  });
});
module.exports = {
  getAll,
  getOne,
  create,
  update,
  myUploadDeadlines,
};
