const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
});

categorySchema.virtual("bookCount", {
  ref: "Book",
  localField: "_id",
  foreignField: "categories",
  count: true,
});

const Category = model("Category", categorySchema);
module.exports = Category;
// const { Schema, model } = require("mongoose");

// const categorySchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   description: { type: String },
// });

// const Category = model("Category", authorSchema);
// module.exports = Category;
