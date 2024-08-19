//server must be running and you run this file independently
const axios = require("axios");
const data = require("./books.json");

try {
  data.map((book) => {
    axios.post("http://0.0.0.0:3000/api/books", book);
  });
} catch (error) {
  console.log(error);
}
