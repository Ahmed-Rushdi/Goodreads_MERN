const express = require("express");
const logger = require('morgan');

const app = express();
app.use(logger('dev'));

const port = process.env.PORT;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
