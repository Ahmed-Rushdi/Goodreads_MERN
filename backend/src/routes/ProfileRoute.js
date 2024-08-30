const express = require('express');
const { getAllBooksByUser, addToShelf, getBooksbyShelfName } = require('../controllers/UserBooksController');
const { updateProfileInfo } = require('../controllers/UserController')
const { verification } = require('../controllers/AuthenticationController');

const router = express.Router();

// Get all books for the logged in user

router.get('/', verification, getAllBooksByUser);

// Add books to a certain shelf for the logged in user

router.post('/', verification, addToShelf);

router.post('/filter', verification, getBooksbyShelfName);

router.put('/update', verification, updateProfileInfo)

module.exports = router;