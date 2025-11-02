import express from 'express';
import { celebrate, Joi } from 'celebrate';

import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), updateUserAvatar);

export default router;
