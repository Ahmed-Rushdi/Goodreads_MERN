const Book = require('../models/Book.model');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({error: "Failed to fetch books"});
    }
};

module.exports = {
    getAllBooks,
};