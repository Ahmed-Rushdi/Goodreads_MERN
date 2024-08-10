const { Schema, model } = require("mongoose");
const { Review } = require("./Review.model.js");
const bookSchema = new Schema({
  isbn13: {
    type: Schema.Types.ObjectId(String),
    match: /^[0-9]{12}[0-9X]$/,
    required: [true, "ISBN 13 is required"],
  },
  isbn10: {
    type: String,
    match: /^[0-9]{9}[0-9X]$/,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  pageCount: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  language: {
    type: String,
  },
  categories: {
    type: [String],
  },
  ratings: {
    type: [Review],
  },
});
const Book = model("Book", bookSchema);
module.exports = Book;
