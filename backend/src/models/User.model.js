const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userRole: { type: String, enum: ["user", "admin"], default: "user" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  currentlyReading: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  wantToRead: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  refreshToken: { type: String },
  googleId: { type: String },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.comparedPassword = function (possiblePassword) {
  return bcrypt.compare(possiblePassword, this.password);
};

const User = model("User", userSchema);
module.exports = User;
