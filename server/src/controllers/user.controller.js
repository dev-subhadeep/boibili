const User = require("../models/user.model.js");

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.find({ username, password });
    if (existingUser) {
      res.status(200).json({ message: "User exists. Please login." });
    }
    const user = await User.create({
      username,
      password,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(400).json({ error: "Error deleting user." });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createUser,
  deleteUser,
};
