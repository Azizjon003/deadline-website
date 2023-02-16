const User = require("../model/user");

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getAll,
};
