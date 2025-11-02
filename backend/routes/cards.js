import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const router = express.Router();

router.get('/', celebrate({
  query: Joi.object().keys({
    owner: Joi.string().hex().length(24),
  }),
}), getCards);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

export default router;
