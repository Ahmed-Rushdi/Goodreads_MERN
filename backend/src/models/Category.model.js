const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String },
});
categorySchema.index({ name: "text" });
const Category = model("Category", categorySchema);
module.exports = Category;
