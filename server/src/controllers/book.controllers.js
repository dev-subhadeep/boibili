const Book = require("../models/book.model.js");
const { isValidISBN } = require("../utils/validation.js");

const createBook = async (req, res) => {
  const { title, author, isbn, description, publish_date, condition } =
    req.body;
  const { userId } = req.user;
  if (!Date.parse(publish_date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  if (!isValidISBN(isbn)) {
    return res.status(400).json({ error: "Invalid ISBN format" });
  }
  try {
    const book = await Book.create({
      title,
      author,
      isbn,
      description,
      publish_date,
      condition,
      donor: userId,
    });

    if (book) {
      res.status(201).json({ message: "Book added successfully!", book });
    } else {
      res.status(400).send({ error: "Error adding book. Please try again." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: `${error.message}` });
  }
};

const getBooks = async (req, res) => {
  const { author, title, page } = req.query;

  try {
    let q = {};
    if (author) {
      q.author = { $regex: author };
    }
    if (title) {
      q.title = { $regex: title };
    }
    if (page) {
      s = 10 * (page - 1);
    } else {
      s = 0;
    }
    console.log(q);
    const books = await Book.find(q).skip(s).limit(10);
    if (books && books.length) {
      res
        .status(200)
        .json({ message: `${books.length} book(s) found.`, books });
    } else {
      res.status(404).json({ error: "No book found" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const getBook = async (req, res) => {
  const { _id } = req.params;
  try {
    const book = await Book.findById(_id);
    if (book) {
      res.status(200).json({ message: "Book found", book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const updateBook = async (req, res) => {
  const { _id } = req.params;
  const { title, author, isbn, condition } = req.body;
  const { userId } = req.user;
  try {
    const book = await Book.findOne({ _id });
    if (book.donor !== userId) {
      return res.status(403).json({ error: "Access forbidden" });
    }

    const updatedBook = await Book.findByIdAndUpdate(_id, {
      title,
      author,
      isbn,
      condition,
    });
    if (updatedBook) {
      res.status(200).json({ message: "Book updated successfully" });
    } else {
      res.status(400).json({ error: "Error updating book. Please try again" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBook = async (req, res) => {
  const { _id } = req.params;
  const { userId } = req.user;
  try {
    const book = await Book.findOne({ _id });
    if (book.donor !== userId) {
      return res.status(403).json({ error: "Access forbidden" });
    }
    const deletedBook = await Book.findByIdAndDelete(_id);

    if (deletedBook) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(400).json({ error: "Error deleting book. Please try again" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
