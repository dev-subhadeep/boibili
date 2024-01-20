const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller.js");

userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);
userRouter.get("/", loginUser);

module.exports = userRouter;
