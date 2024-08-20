const express = require('express');
const { getAllBooksByUser } = require('../controllers/UserBooksController');
const { verification } = require('../controllers/AuthenticationController');

const router = express.Router();

router.get('/', verification, getAllBooksByUser);

module.exports = router;