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

module.exports = {
    getAllBooksByUser,
};


  