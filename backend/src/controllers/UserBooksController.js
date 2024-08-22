const { fetchUserById } = require('../controllers/AuthenticationController');

// Get all books for the user ID:

const getAllBooksByUser = async (req, res) => {
    try {

        const user = await fetchUserById(req);

        const allBooks = await user.populate('books');
        console.log(allBooks);
        const read = await user.populate('read');
        const currentlyReading = await user.populate('currentlyReading');
        const wantToRead = await user.populate('wantToRead');

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            books: allBooks,
            read: read,
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
        });
        
    } catch (error) {
        console.error("Error fetching user profile:", error);

        res.status(500).json({error: "Failed to fetch books for this user"});
    }
};

const addToShelf = async (req, res) => {
    try {
        const { bookId, shelf } = req.body;  // Destructure bookId and shelf from the request body
        const user = await fetchUserById(req);  // Await the fetchUserById function with the request object

        // const shelves = ['read', 'currentlyReading', 'wantToRead'];

        // for (let s of shelves) {
        //     if(user[s].includes(bookId)) {
        //         if (s !== shelf) {

        //         }
        //     }
        // }

        if (!user[shelf].includes(bookId)) {
            user[shelf].push(bookId);  // Add the book to the specified shelf
        } else {
            return res.status(400).json(`This book is already in the ${shelf} shelf.`);
        }

        await user.save();  // Save the updated user document
        return res.status(200).json({
            message: `This book was added successfully to the ${shelf} shelf.`,
            bookId: bookId
        });

    } catch (error) {
        console.error(`Error adding this book to the ${shelf} shelf`, error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

// const removeFromShelf = async (req, res) => {
//     try {

//     }
// }


module.exports = {
    getAllBooksByUser,
    addToShelf,

};


  