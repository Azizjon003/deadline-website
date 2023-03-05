const Course = require("./course");

const dotenv = require("dotenv");
dotenv.config();
const connection = require("./connection");
connection();

const data = ["1", "2", "3", "4"];

const dataAdd = async () => {
  for (let i = 0; i < data.length; i++) {
    try {
      await Course.create({
        name: data[i],
      });
      console.log("Succes");
    } catch (err) {
      console.log("Error");
    }
  }
};

dataAdd();
