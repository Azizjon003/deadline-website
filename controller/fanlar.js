const catchAsync = require("../utility/catchUser");

const science = require("../model/science");
const getAll = catchAsync(async (req, res, next) => {
  const data = await science.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = { getAll };
