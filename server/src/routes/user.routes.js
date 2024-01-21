const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  deleteUser,
  loginUser,
  logoutUser,
  validateUser,
} = require("../controllers/user.controller.js");

userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/validate", validateUser);

module.exports = userRouter;
