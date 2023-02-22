const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 20 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});

let uploadFileMiddleware = util.promisify(uploadFile.single("file"));

module.exports = uploadFileMiddleware;
