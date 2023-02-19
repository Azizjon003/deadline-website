const User = require("../model/user");
const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchUser");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const signUp = catchAsync(async (req, res, next) => {
  const {
    name,
    lastname,
    faculty_id,
    cource,
    email,
    password,
    passwordConfirm,
  } = req.body;

  const user = await User.create({
    name,
    lastname,
    faculty_id,
    cource,
    email,
    password,
    passwordConfirm,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
  });
});
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(user);
  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const isCorrect = await user.correctPassword(password, user.password);
  if (!isCorrect) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
  });
});
const updatePassword = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm, passwordCurrent } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  if (password !== passwordConfirm) {
    return next(
      new AppError("Password and password confirm are not same", 400)
    );
  }
  try {
    await User.updateOne({ _id: req.user.id }, { password });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
  });
});
const protect = catchAsync(async (req, res, next) => {
  //1 tokenni tekshirish
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  }

  console.log(token);
  // tokenni tekshirish kerak
  const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(id);
  if (!id) {
    return next(new AppError("Please log in", 401));
  }
  // user bazada bor yo'qligini tekshirib olish
  const user = await User.findById(id.id);

  if (!user) {
    return next(new AppError("User is not found", 401));
  }

  // if (id.ieat < user.passwordChangedAt.getTime() / 1000) {
  //   return next(new AppError("jwt malformet", 401));
  // }
  req.user = user;
  res.locals.user = user;
  next();
});

module.exports = {
  signUp,
  login,
  updatePassword,
  protect,
};