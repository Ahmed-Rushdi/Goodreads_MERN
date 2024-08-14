const express = require('express');
const { getAllBooks } = require('../controllers/bookControllers')


const router = express.Router();

router.get('/', getAllBooks);

module.exports = router;