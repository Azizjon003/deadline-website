const AppError = require("./appError");

const catchAsync = (funksiya) => {
  const ishlaFunct = async (req, res, next) => {
    await funksiya(req, res, next).catch((err) => {
      next(new AppError(err.message, err.statusCode));
    });
  };

  return ishlaFunct;
};

module.exports = catchAsync;
