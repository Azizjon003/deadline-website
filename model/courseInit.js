const Course = require("./course");

const dotenv = require("dotenv");
dotenv.config();
const connection = require("./connection");
connection();

const data = [
  {
    name: "1",
    image:
      "https://www.shutterstock.com/image-illustration/3d-render-number-one-best-600w-2015739188.jpg",
  },
  {
    name: "2",
    image:
      "https://www.shutterstock.com/image-illustration/3d-render-number-two-glowing-600w-1890767737.jpg",
  },
  {
    name: "3",
    image:
      "https://www.shutterstock.com/image-illustration/3d-render-number-three-glowing-600w-1890767731.jpg",
  },
  {
    name: "4",
    image:
      "https://www.shutterstock.com/shutterstock/photos/1890767734/display_1500/stock-photo--d-render-number-four-glowing-in-the-dark-pink-blue-neon-light-1890767734.jpg",
  },
];

const dataAdd = async () => {
  for (let i = 0; i < data.length; i++) {
    try {
      await Course.create({
        name: data[i].name,
        image: data[i].image,
      });
      console.log("Succes");
    } catch (err) {
      console.log("Error");
    }
  }
};

dataAdd();
