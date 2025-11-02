const express = require('express');
const cardsController = require('../controllers/cards');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.get('/',celebrate({
  query: Joi.object().keys({
    owner: Joi.string().hex().length(24),
  }),
}), cardsController.getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), cardsController.getCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
}), cardsController.createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), cardsController.deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), cardsController.likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), cardsController.dislikeCard);

module.exports = router;
