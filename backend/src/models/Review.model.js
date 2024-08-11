const { Schema, model } = require("mongoose");
const { ratingValidator, isbnValidator } = require("../utils/validators");
// ! WARNING: don't call .save() this isn't meant to be a Collection just a Subdocument for Books and Users 

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    BookId: {
      type: String,
      ref: "Book",
      validator: isbnValidator,
    },
    rating: {
      type: Number,
      validate: {
        validator: ratingValidator,
        message: (props) =>
          `${props.value} is not a valid rating! Rating must be between 0 and 5.`,
      },
      required: true,
    },
    review: String,
  },
  { timestamps: true }
);
const Review = model("Review", reviewSchema);
module.exports = Review;
