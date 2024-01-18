const express = require("express");
const bookRouter = express.Router();
const auth = require("../middlewares/auth.js");
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers.js");

bookRouter.get("/", getBooks);
bookRouter.get("/:_id", getBook);
bookRouter.post("/", auth, createBook);
bookRouter.patch("/:_id", auth, updateBook);
bookRouter.delete("/:_id", auth, deleteBook);

module.exports = bookRouter;
