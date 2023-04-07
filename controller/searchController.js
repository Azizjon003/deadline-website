const catchAsync = require("../utility/catchUser");
const Deadline = require("../model/deadline");

const searching = catchAsync(async (req, res, next) => {
  const query = req.query;
  console.log(req.query.name);
  const deadline = await Deadline.find({
    active: true,

    name: { $regex: query.name.toLowerCase() },
  }).select("-file -active");

  res.status(200).json({
    status: "success",
    data: {
      deadline,
    },
  });
});

module.exports = {
  searching,
};
