const express = require("express");
const userRouter = express.Router();
const { createUser, deleteUser } = require("../controllers/user.controller.js");

userRouter.post("/", createUser);
userRouter.delete("/", deleteUser);

module.exports = userRouter;
