const uploadFile = require("../utility/upload");
const catchAsync = require("../utility/catchUser");
const AppError = require("../utility/appError");
const File = require("../model/files");
const upload = async (req, res, next) => {
  try {
    await uploadFile(req, res);

    console.log(req.file);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    const name = req.file.filename;
    const path = req.file.path;
    const size = req.file.size;
    let files;
    try {
      files = await File.create({
        name,
        path,
        size,
        createdWho: req.user._id,
      });

      console.log(files);
    } catch (err) {
      next(new AppError(err.message, 500));
    }
    res.status(200).json({
      status: "success",
      data: files._id,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

module.exports = {
  upload,
};
