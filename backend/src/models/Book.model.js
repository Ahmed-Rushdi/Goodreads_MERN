const { Schema, model } = require("mongoose");
const { isbnValidator } = require("../utils/validators");
const reviewSchema = require("./Review.schema");
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
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    virtual: {
      get() {
        const totalRatings = this.reviews.filter(
          (review) => review.rating > 0
        ).length;
        if (totalRatings === 0 || !this.reviews) return 0;
        const totalStars = this.reviews.reduce((acc, review) => {
          return acc + review.rating;
        }, 0);
        return totalStars / totalRatings;
      },
    },
  },
  ratingsCount: {
    type: Number,
    virtual: {
      get() {
        return this.reviews.filter((review) => review.rating > 0).length;
      },
    },
  },
});

bookSchema.index({ title: "text" });
const Book = model("Book", bookSchema);
module.exports = Book;
