const { Schema, model } = require("mongoose");

// ! WARNING: don't call .save() this isn't meant to be a Collection just a Subdocument for Books and Users 

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    BookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rating: {
      type: Number,
      validate: {
        validator: function (val) {
          return val >= 1 && val <= 5;
        },
        message: (props) =>
          `${props.value} is not a valid rating! Rating must be between 1 and 5.`,
      },
      required: true,
    },
    review: String,
  },
  { timestamps: true }
);
const Review = model("Review", reviewSchema);
module.exports = Review;
