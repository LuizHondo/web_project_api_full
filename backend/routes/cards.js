const express = require('express');
const cardsController = require('../controllers/cards');

const router = express.Router();

router.get('/', cardsController.getCards);
router.get('/:id', cardsController.getCardById);
router.post('/', cardsController.createCard);
router.delete('/:id', cardsController.deleteCard);
router.put('/:id/likes', cardsController.likeCard);
router.delete('/:id/likes', cardsController.dislikeCard);

module.exports = router;
