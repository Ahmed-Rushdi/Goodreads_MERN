const { Schema, model } = require("mongoose");
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
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  authorId: {
    type: Schema.Types.ObjectId,
    index: true,
    ref: "Author",
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
    type: [Schema.Types.ObjectId],
    ref: "Category",
    index: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", // Reference to the Review model
    },
  ],
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
