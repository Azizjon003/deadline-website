const User = require("../model/user");
const catchAsync = require("../utility/catchUser");
const getAll = catchAsync(async (req, res, next) => {
  const users = await User.find({
    active: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

const getOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.find({
    _id: id,
  });
  console.log(user);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

const update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.updateOne({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const deleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.updateOne({ _id: id }, { active: false });

  console.log(user);
  res.status(200).json({
    status: "success",
  });
});
module.exports = {
  getAll,
  getOne,
  deleteOne,
  update,
};
