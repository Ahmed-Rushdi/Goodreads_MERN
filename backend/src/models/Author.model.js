const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },
    bio: { type: String },
    birthDate: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
authorSchema.virtual("bookCount", {
  ref: "Book",
  localField: "_id",
  foreignField: "authorId",
  count: true,
});

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "authorId",
  justOne: false,
  options: { select: "title isbn3" },
});
authorSchema.index({ name: "text" });
const Author = model("Author", authorSchema);
module.exports = Author;
