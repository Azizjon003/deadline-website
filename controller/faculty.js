const catchAsync = require("../utility/catchUser");
const Faculty = require("../model/faculties");
const getAll = catchAsync(async (req, res, next) => {
  const data = await Faculty.find({});
  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = {
  getAll,
};
