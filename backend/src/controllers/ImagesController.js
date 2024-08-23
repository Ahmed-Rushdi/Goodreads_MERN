const fs = require("fs");
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const uploadBookCover = async (req, res) => {
  const bookIsbn = req.headers["x-book-isbn"];
  const fileExt = req.headers["x-file-type"];
  console.log(req.headers);
  const book = await Book.findOne({ isbn13: bookIsbn });
  console.log(book);
  const bookId = book._id;

  if (!bookId) {
    return res.status(400).send("Missing book info in image upload request");
  }

  const fileName = `${bookId}.${fileExt}`;

  const filePath = `./public/thumbnails/${fileName}`;
  const fileStream = fs.createWriteStream(filePath);

  console.log(typeof req.body);

  req.pipe(fileStream);

  req.on("end", () => {
    console.log(`book image uploaded successfully: ${fileName}`);
    res.send("Book cover uploaded successfully!");
  });

  req.on("error", (err) => {
    console.error(`Error uploading book cover: ${err}`);
    res.status(500).send("Error uploading book cover");
  });
};

const uploadAuthorImage = async (req, res) => {
  const authorName = req.headers["x-author-name"];
  const fileExt = req.headers["x-file-type"];

  const author = await Author.findOne({ name: authorName });
  const authorId = author._id;
  if (!authorId) {
    return res.status(400).send("Missing author info in image upload request");
  }

  const fileName = `${authorId}.${fileExt}`;

  const filePath = `./public/author_avatars/${fileName}`;
  const fileStream = fs.createWriteStream(filePath);

  console.log(typeof req.body);

  req.pipe(fileStream);

  req.on("end", () => {
    console.log(`author image uploaded successfully: ${fileName}`);
    res.send("Book cover uploaded successfully!");
  });

  req.on("error", (err) => {
    console.error(`Error uploading book cover: ${err}`);
    res.status(500).send("Error uploading book cover");
  });
};

module.exports = {
  uploadBookCover,
  uploadAuthorImage,
};
