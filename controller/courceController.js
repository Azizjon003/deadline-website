const catchAsync = require("../utility/catchUser");
const Course = require("../model/course");

const getAll = catchAsync(async (req, res, next) => {
  const data = await Course.find();
  let data1 = [];
  let link = `${process.env.URL}api/v1/deadline/course/`;
  for (let i = 0; i < data.length; i++) {
    data1.push({
      name: data[i].name,
      image: data[i].image,
      link: link + data[i]._id,
      id: data[i]._id,
    });
  }
  res.status(200).json({
    status: "succes",
    data: data1,
  });
});

module.exports = {
  getAll,
};
