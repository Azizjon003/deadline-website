const Faculty = require("./faculties");
const datas = [
  "KOMPYUTER INJINIRINGI",
  "DASTURIY INJINIRING",
  "KIBERXAVFSIZLIK FAKULTETI",
  "TELEKOMMUNIKATSIYA TEXNOLOGIYALARI FAKULTETI",
  "TELEVIZION TEXNOLOGIYALAR FAKULTETI",
  "RADIO VA MOBIL ALOQA FAKULTETI",
  "AKT SOHASIDA IQTISODIYOT VA MENEJMENT FAKULTETI",
  "AKT SOHASIDA KASB TA’LIMI FAKULTETI",
];
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./connection");
connection();

const initFaculty = async () => {
  try {
    for (let i = 0; i < datas.length; i++) {
      const faculty = await Faculty.create({
        name: datas[i],
      });
      console.log(faculty);
    }
    console.log("Faculty created");
  } catch (err) {
    console.log(err);
  }
};

initFaculty();
