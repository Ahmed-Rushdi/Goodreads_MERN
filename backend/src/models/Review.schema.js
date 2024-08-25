const { Schema } = require("mongoose");
const { ratingValidator, isbnValidator } = require("../utils/validators");

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: String,
      ref: "Book",
      validator: isbnValidator,
    },
    rating: {
      type: Number,
      default: 0,
      validate: {
        validator: ratingValidator,
        message: (props) =>
          `${props.value} is not a valid rating! Rating must be between 0 and 5.`,
      },
      required: true,
    },
    review: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// const Review = model("Review", reviewSchema);
module.exports = reviewSchema;
