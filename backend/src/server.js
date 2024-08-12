const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const process = require("process");
const booksRoute = require("./routes/BooksRoute");
const reviewsRoute = require("./routes/ReviewsRoute");
const userRoutes = require("./routes/UserRoute");
const connectDB = require("./utils/dbConnection");

const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI;
const logging = process.env.LOGGING;

const app = express();

// * Expose public for thumbnail retrieval (host:port/thumbnails)
// ? is this the way to do it? IDK.
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.use(logger(logging));
app.use("/api/users", userRoutes);
app.use("/api/books", booksRoute);
app.use("/api/reviews", reviewsRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Server is running on http://0.0.0.0:${port}");
    });
  } catch (error) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

// connectDB();
// app.listen(port, () => {
//   console.log(`Server is running on http://0.0.0.0:${port}`);
// });
