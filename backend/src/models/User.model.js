const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const reviewSchema = require("./Review.schema");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userRole: { type: String, enum: ["user", "admin"], default: "user" },
  reviews: [reviewSchema],
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  read: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  currentlyReading: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  wantToRead: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  refreshToken: { type: String },
  googleId: { type: String },
});

const User = model("User", userSchema);
module.exports = User;
