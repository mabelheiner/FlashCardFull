const express = require('express')
const router = express.Router();

router.use('/flashcards', require('./flashcards'))

module.exports = router;