const { Schema, model } = require("mongoose");
const { Review } = require("./Review.model.js");
const { isbnValidator } = require("../utils/validators");

const bookSchema = new Schema({
  isbn13: {
    type: String,
    unique: true,
    validate: {
      validator: isbnValidator,
      message: (props) =>
        `${props.value} is not a valid ISBN-13! It should be 13 digits with the last one being a number or 'X'.`,
    },
    required: [true, "ISBN 13 is required"],
  },
  // isbn10: {
  //   type: String,
  //   unique: true,
  //   validate: {
  //     validator: function (v) {
  //       return v ? /^[0-9]{12}[0-9X]$/.test(v) : true;
  //     },
  //     message: (props) =>
  //       `${props.value} is not a valid ISBN-10! It should be 10 digits with the last one being a number or 'X'.`,
  //   },
  // },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    index: true,
    required: [true, "Author is required"],
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
    index: true,
  },
  reviews: {
    type: [Review],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  ratingsCount: {
    type: Number,
    default: 0,
  },
});
const Book = model("Book", bookSchema);
module.exports = Book;
