const User = require("../models/User.model");
const Book = require("../models/Book.model");

const editShelf = async (req, res) => {
  try {
    const { isbn13 } = req.params; // Assuming the ISBN is being passed as a parameter
    const { shelf } = req.body; // The new shelf name (currentlyReading, read, wantToRead)
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

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
    const userId = req.user.id; 
    const { isbn } = req.query; 
    const user = await User.findById(userId).populate({
      path: "books.book",
      model: "Book",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const bookEntry = user.books.find((b) => b.book.isbn13 === isbn);

    if (!bookEntry) {
      return res.status(200).json({ shelfName: null }); 
    }

    return res.status(200).json({ shelfName: bookEntry.shelf });
  } catch (error) {
    console.error("Error getting book shelf:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shelf } = req.query;
    const user = await User.findById(userId).populate({
      path: "books.book",
      model: "Book",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let userBooks = user.books;

    if (shelf) {
      // Filter books by shelf if a shelf parameter is provided
      userBooks = userBooks.filter((book) => book.shelf === shelf);
    }

    // Extract just the book data and shelf information
    const books = userBooks.map((item) => ({
      ...item.book.toObject(),
      shelf: item.shelf,
    }));

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { editShelf, getBookShelf, getAllBooks };
