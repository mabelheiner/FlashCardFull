const express = require('express');
const router = express.Router();

const flashcardController = require('../controllers/flashcards');

router.get('/', flashcardController.getAll);
router.get('/id', flashcardController.getSingle);
router.post('/', flashcardController.createCard);
router.put('/id', flashcardController.updateCard);
router.delete('/id', flashcardController.deleteCard);

module.exports = router;