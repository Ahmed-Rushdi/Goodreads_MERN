const User = require("../models/User.model");
const Book = require("../models/Book.model");

const editShelf = async (req, res) => {
  try {
    const { isbn13 } = req.params; // Assuming the ISBN is being passed as a parameter
    const { shelf } = req.body; // The new shelf name (currentlyReading, read, wantToRead)
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    // Find the book by ISBN13
    const book = await Book.findOne({ isbn13 });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);

    // Check if the book is already in the user's list
    const bookIndex = user.books.findIndex((b) => b.book.equals(book._id));

    if (bookIndex >= 0) {
      // If the book is already in the list, update the shelf or remove the book if no shelf is provided
      if (shelf) {
        user.books[bookIndex].shelf = shelf;
      } else {
        user.books.splice(bookIndex, 1); // Remove the book if no shelf is provided
      }
    } else {
      // If the book is not in the list, add it to the specified shelf
      if (shelf) {
        user.books.push({ book: book._id, shelf });
      }
    }

    await user.save();
    res
      .status(200)
      .json({ message: "Shelf updated successfully", books: user.books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookShelf = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is stored in req.user after authentication
    const { isbn } = req.query; // Get the ISBN from query parameters

    // Find the book by ISBN
    const book = await Book.findOne({ isbn13: isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Find the user and check if the book exists in their shelf
    const user = await User.findById(userId).populate("books.book");

    const bookEntry = user.books.find((b) => b.book._id.equals(book._id));

    if (!bookEntry) {
      return res.status(200).json({ shelfName: null }); // Book not found in any shelf
    }

    return res.status(200).json({ shelfName: bookEntry.shelf });
  } catch (error) {
    console.error("Error getting book shelf:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const { shelf } = req.query; // Get the shelf filter from query params
    let books;

    if (shelf) {
      // Filter books by shelf
      books = await Book.find().populate({
        path: "users",
        match: { "books.shelf": shelf },
        select: "books",
      });
    } else {
      // Get all books without filtering
      books = await Book.find();
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { editShelf, getBookShelf, getAllBooks };
