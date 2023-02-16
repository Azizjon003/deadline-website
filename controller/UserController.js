const User = require("../model/user");
const catchAsync = require("../utility/catchUser");
const getAll = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

module.exports = {
  getAll,
};
