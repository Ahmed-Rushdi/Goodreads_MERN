const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const reviewSchema = require("./Review.schema");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userRole: { type: String, enum: ["user", "admin"], default: "user" },
  reviews: [reviewSchema],
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book" },
      shelf: {
        type: String,
        enum: ["currentlyReading", "read", "wantToRead"],
        required: true,
      },
    },
  ],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  refreshToken: { type: String },
  googleId: { type: String },
  // secretQuestion: { type: String, required: true },
  // secretAnswer: { type: String, required: true },
});

const User = model("User", userSchema);
module.exports = User;
