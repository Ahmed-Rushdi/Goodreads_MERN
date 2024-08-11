import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userRole: { type: String, enum: ["user", "admin"], default: "user" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  currentlyReading: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  wantToRead: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  verificationToken: { type: String },
  refreshToken: { type: String },
});

export default mongoose.model("User", userSchema);
