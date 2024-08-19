const Book = require('../models/Book.model');

// Get all books for the user ID:

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({error: "Failed to fetch books"});
    }
};

// Get all books by the user ID and status:



module.exports = {
    getAllBooks,
};