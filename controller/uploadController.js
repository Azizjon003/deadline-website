const uploadFile = require("../utility/upload");
const catchAsync = require("../utility/catchUser");

const upload = async (req, res, next) => {
  await uploadFile(req, res);

  if (req.file == undefined) {
    return res.status(400).send({ message: "Please upload a file!" });
  }

  res.status(200).send({
    message: "Uploaded the file successfully: " + req.file.originalname,
  });
};

module.exports = {
  upload,
};
