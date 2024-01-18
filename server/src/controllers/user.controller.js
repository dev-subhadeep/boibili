const User = require("../models/user.model.js");

const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Something went wrong. Please try again." });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    if (deletedUser) {
      res.status(200).send({ message: "User deleted successfully" });
    } else {
      res.status(400).send({ error: "Error deleting user." });
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

module.exports = {
  createUser,
  deleteUser,
};
