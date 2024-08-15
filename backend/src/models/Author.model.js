const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: { type: String },
  bio: { type: String },
  birthDate: { type: Date },
});

const Author = model("Author", authorSchema);
module.exports = Author;
