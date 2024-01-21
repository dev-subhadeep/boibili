const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtpk, cookieOptions } = require("../utils/constants.js");

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

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      const token = jwt.sign(
        { userId: existingUser._id, role: existingUser.role },
        jwtpk,
        {
          expiresIn: "7d",
        },
      );
      return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({ message: "Logged in successfully", token });
    } else {
      return res.status(400).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error.message}` });
  }
};

const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", cookieOptions)
      .json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const validateUser = async (req, res) => {
  try {
    const token = req.cookies.token || null;
    if (token) {
      const data = await jwt.verify(token, jwtpk);
      if (data) {
        res.status(200).json({ success: true, token });
      }
    }
    res.status(401).json({ success: false });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  validateUser,
};
