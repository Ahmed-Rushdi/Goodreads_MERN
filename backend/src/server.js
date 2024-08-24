// * Import Dependencies
const express = require("express");
const logger = require("morgan");
const path = require("path");
const process = require("process");
const connectDB = require("./utils/dbConnection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./utils/passport");

// * Import Routes
const booksRoute = require("./routes/BooksRoute");
const reviewsRoute = require("./routes/ReviewsRoute");
const authorRoute = require("./routes/AuthorRoute");
const categoriesRoute = require("./routes/CategoriesRoute");
const userRoutes = require("./routes/UserRoute");
const profileRoute = require("./routes/ProfileRoute");
const trendsRoute = require("./routes/TrendsRoute");
const authenticationRoute = require("./routes/authenticationRoute");
const imageUploadRoute = require("./routes/ImageUploadRoute");

require("dotenv").config();
const port = process.env.PORT;
const logging = process.env.LOGGING;
const session_secret = process.env.session_secret;

const app = express();
app.use(cookieParser());

// google session /////

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you want to allow cookies or authentication headers
  })
);

// * Expose public for thumbnail retrieval (host:port/thumbnails)
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(logging));

// * Use Routes
app.use("/api/images", imageUploadRoute);
app.use("/api", authenticationRoute);
app.use("/api/user-book", userRoutes);
app.use("/api/trend", trendsRoute);
app.use("/api/books", booksRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/authors", authorRoute);
app.use("/api/categories", categoriesRoute);
app.use("/api/profile", profileRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
//
// connectDB();
// app.listen(port, () => {
//   console.log(`Server is running on http://0.0.0.0:${port}`);
// });
