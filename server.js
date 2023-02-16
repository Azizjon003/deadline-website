const dotenv = require("dotenv");
dotenv.config();
const app = require("./middlewares/main");
const connection = require("./model/connection");
connection();
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
