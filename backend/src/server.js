const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const booksRoute = require("./routes/BooksRoute.js");

const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI;
const logging = process.env.LOGGING;

const app = express();

// * Expose public for thumbnail retrieval
// ? is this good practice? IDK.
app.use(express.static(path.join(__dirname, "../public")));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .then(() => console.log("Database Name:", mongoose.connection.name))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(logger(logging));

app.use("/api/books", booksRoute);

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
