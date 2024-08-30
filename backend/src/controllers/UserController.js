const { fetchUserById } = require('../controllers/AuthenticationController');
const User = require('../models/User.model');

const updateProfileInfo = async (req, res) => {
    try {
        const { username, email } = req.body;

        const user = await fetchUserById(req);

        if (!user) {
            console.error('User is not found');
            return res.status(400).json({ message: 'User is not found' });
        }

        // Update the user info
        user.name = username;
        user.email = email;

        await user.save();

        return res.status(200).json({ message: 'Updated user info successfully!' });
    } catch (error) {
        console.log('Error handling the user info update request:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    updateProfileInfo
};
