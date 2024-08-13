const express = require('express');
const { getAllBooks } = require('../controllers/bookControllers')


const router = express.Router();

router.get('/api/profile', getAllBooks);

module.exports = router;