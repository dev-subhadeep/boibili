const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller.js");

userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);
userRouter.get("/", loginUser);
userRouter.get("/logout", logoutUser);

module.exports = userRouter;
