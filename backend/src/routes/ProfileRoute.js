const express = require('express');
const { getAllBooks } = require('../controllers/UserBooksController');



const router = express.Router();

router.get('/', getAllBooks);

module.exports = router;