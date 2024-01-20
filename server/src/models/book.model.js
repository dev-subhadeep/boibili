const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    require: [true, "Author is required"],
  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"],
  },
  description: String,
  publish_date: Date,
  verified: {
    type: Boolean,
    default: false,
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
