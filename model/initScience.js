const arr = [
  "Dinshunoslik",
  "Akademik yozuv",
  "Ingliz tiliI",
  "Hisob (Calculus)",
  "Fizika I",
  "Dasturlash I",
];
const Sciences = require("./science");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./connection");
connection();
const initScience = async () => {
  for (let i = 0; i < arr.length; i++) {
    const science = await Sciences.create({
      name: arr[i],
    });
    console.log(science);
  }
};

initScience();
