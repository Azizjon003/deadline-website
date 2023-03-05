const catchAsync = require("../utility/catchUser");
const Course = require("../model/course");

const getAll = catchAsync(async (req, res, next) => {
  const data = await Course.find();

  res.status(200).json({
    status: "succes",
    data,
  });
});

module.exports = {
  getAll,
};
