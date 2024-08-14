const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  bio: { type: String },
  birthDate: { type: Date },
});

authorSchema.virtual("bookCount", {
  ref: "Book",
  localField: "_id",
  foreignField: "authorId",
  count: true,
});

authorSchema
  .virtual("totalRatings", {
    ref: "Book",
    localField: "_id", // The field in 'Author' that is the same as the foreign field in 'Book'
    foreignField: "authorId", // The field in 'Book' that points to 'Author'
    options: { select: "ratingCount" },
    justOne: false,
  })
  .get(function (books) {
    return books.reduce((total, book) => total + book.ratingsCount, 0);
  });
authorSchema
  .virtual("averageRatings", {
    ref: "Book",
    localField: "_id",
    foreignField: "authorId",
    options: { select: "averageRating" },
    justOne: false,
  })
  .get(function (books) {
    if (books.length === 0) return 0;
    const totalAverageRating = books.reduce(
      (total, book) => total + book.averageRating,
      0
    );
    return totalAverageRating / books.length;
  });

const Author = model("Author", authorSchema);
module.exports = Author;
// const { Schema, model } = require("mongoose");

// const authorSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   bio: { type: String },
//   birthDate: { type: Date },
// });

// const Author = model("Author", authorSchema);
// module.exports = Author;
