const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT;
const mongoUri = process.env.MONGODB_URI;
const logging = process.env.LOGGING;

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .then(() => console.log("Database Name:", mongoose.connection.name))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(logger(logging));

app.get("/", (req, res) => {
  res.send("GET: Hello World!");
});

app.post("/api", (req, res) => {
  res.send("POST: Hello API! " + req.body.name);
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
