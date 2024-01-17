const express = require("express");
const bookRouter = express.Router();
const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers.js");

bookRouter.get("/", getBooks);
bookRouter.get("/:_id", getBook);
bookRouter.post("/", createBook);
bookRouter.patch("/:_id", updateBook);
bookRouter.delete("/:_id", deleteBook);

module.exports = bookRouter;
