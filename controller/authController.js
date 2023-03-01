const User = require("../model/user");
const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchUser");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Deadline = require("../model/deadline");
const OptionSort = function (options, permission) {
  const option = {};
  console.log(permission);
  Object.keys(options).forEach((key) => {
    if (permission.includes(key)) option[key] = options[key];
  });

  return option;
};
const signUp = catchAsync(async (req, res, next) => {
  //sirtqi qo'shish kk
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
const updateMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;
  const optionPermission = ["name", "lastname"];
  let option = {};
  option.name = req.body.name || req.user.name;
  option.lastname = req.body.lastname || req.user.lastname;

  const options = OptionSort(option, optionPermission);

  console.log(options);
  const user = await User.updateOne({ _id: id }, options, {
    new: true,
    runValidators: true,
  });
  const userData = await User.findById(id);
  res.status(200).json({
    status: "success",
    data: userData,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const deleteData = await User.findByIdAndUpdate(
    req.user._id,
    {
      active: false,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
  });
});
const role = (roles) => {
  return catchAsync(async (req, res, next) => {
    console.log(req.user);
    console.log(roles.includes("admin"));
    if (!roles.includes(req.user.role)) {
      return next(new AppError("Siz bu huquqga ega emassiz", 401));
    }
    next();
  });
};

const isSignin = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.cookies);
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!req.cookies.jwt || req.cookies.jwt == "logout") {
    return next();
  }

  // tokenni tekshirish kerak
  const id = await promisify(jwt.verify)(token, process.env.SECRET);
  if (!id) {
    console.log("sana");
    return next();
  }
  // user bazada bor yo'qligini tekshirib olish

  const user = await User.findById(id.id);

  if (!user) {
    return next();
  }
  res.locals.user = user;
  return next();
});
const logout = (req, res, next) => {
  console.log("logotga kirdi");
  res.cookie("jwt", "logout", {
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    token: "logout",
  });
};

const cashCheck = catchAsync(async (req, res, next) => {
  const id = req.user.id;

  const user = await User.findOne({
    _id: id,
  });

  if (user.balance <= 0) {
    return next(new AppError("Sizda mablag' yetarli emas", 401));
  }
  req.user.balance = user.balance;
  return next();
});
const deadlinecheck = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const user = await User.findOne({
    _id: id,
  });
  const data = await Deadline.find({
    active: false,
  }).populate({
    path: "file",
    select: "id",
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
const adminDeadlinedownload = catchAsync(async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;

  const deadline = await Deadline.findOne({
    _id: id,
  }).populate({
    path: "file",
  });

  res.download(deadline.file.path);
});
const deadlineConfirm = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const confirm = req.body.confirm;
  if (confirm != true) {
    return next(new AppError("Deadline tasdiqlanmadi", 404));
  }
  const deadline = await Deadline.findOne({
    _id: id,
    active: false,
  }).populate({
    path: "file",
    select: "createdWho",
  });

  if (!deadline) {
    return next(new AppError("deadline topilmadi", 404));
  }
  const user = await User.findOne({
    _id: deadline.file.createdWho,
  });

  const userUpdate = await User.updateOne(
    {
      _id: deadline.file.createdWho,
    },
    {
      balance: user.balance + 1,
    }
  );

  const deadlineUpdate = await Deadline.updateOne(
    {
      _id: id,
    },
    {
      active: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Deadline tasdiqlandi",
  });
});

module.exports = {
  signUp,
  login,
  updatePassword,
  protect,
  isSignin,
  logout,
  role,
  updateMe,
  deleteUser,
  cashCheck,
  deadlinecheck,
  adminDeadlinedownload,
  deadlineConfirm,
};
