const { fetchUserById } = require('../controllers/AuthenticationController');
const Book = require('../models/Book.model');
const User = require('../models/User.model');

// Get all books for the user ID:

const getAllBooksByUser = async (req, res) => {
    try {
        const user = await fetchUserById(req);

        const allBooks = await user.populate({
            path: 'books.book',
            populate: [
                { path: 'authorId', model: 'Author' }, // Populate author data
                { path: 'categories', model: 'Category' } // Populate categories data
            ]
        });

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            books: allBooks.books // Only send the populated books
        });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Failed to fetch books for this user" });
    }
};

// Get Book by Shelf Name:

const getBooksbyShelfName = async (req, res) => {
    try {
        const { returnedShelf } = req.body;
        const user = await fetchUserById(req);

        if (!returnedShelf) {
            console.error('Shelf is not provided');
            return res.status(400).json({ message: "Shelf is not available" });
        }

        // Filter books by the selected shelf
        const filteredBooks = user.books.filter((b) => b.shelf === returnedShelf);

        // Populate the filtered books
        const populatedBooks = await User.populate(filteredBooks, {
            path: 'book',
            populate: [
                { path: 'authorId', model: 'Author' },
                { path: 'categories', model: 'Category' }
            ]
        });

        res.status(200).json({ books: populatedBooks });
    } catch (error) {
        console.error("Error fetching filtered books:", error);
        res.status(500).json({ error: "Failed to fetch books for this shelf" });
    }
};


const addToShelf = async (req, res) => {
    let shelf;

    try {
        const { isbn, shelf: shelfFromBody } = req.body;
        shelf = shelfFromBody;
        const user = await fetchUserById(req);

        // Fetch the book using the ISBN
        const book = await Book.findOne({ isbn13: isbn });
        if (!book) {
            console.error("Book not found");
            return res.status(404).json({ message: 'Book not found.' });
        }

        const bookIndex = user.books.findIndex((b) => b.book.equals(book._id));

        if (bookIndex !== -1) {
            // If the book is already in the list, update the shelf or remove it if no shelf is provided
            if (shelf) {
                console.log(`Found book with ISBN ${isbn}, updating shelf to ${shelf}.`);
                user.books[bookIndex].shelf = shelf;
            } else {
                console.log(`Removing book with ISBN ${isbn} from the list.`);
                user.books.splice(bookIndex, 1); // Remove the book if no shelf is provided
            }
        } else {
            // If the book is not in the list, add it to the specified shelf
            if (shelf) {
                console.log(`Book not found in user's list, adding to the ${shelf} shelf.`);
                user.books.push({ book: book._id, shelf });
            }
        }

        await user.save();

        const updatedBook = user.books.find((b) => b.book.equals(book._id));

        return res.status(200).json({
            message: `This book was successfully added to the ${shelf} shelf.`,
            currentShelf: updatedBook ? updatedBook.shelf : null,
        });

    } catch (error) {
        console.error(`Error adding this book to the shelf`, error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports = {
    getAllBooksByUser,
    addToShelf,
    getBooksbyShelfName,
};

