const express = require('express');
const usersController = require('../controllers/users');
const auth = require('../middleware/auth')
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), usersController.login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), usersController.createUser);

router.use(auth);

router.get('/me', usersController.getCurrentUser);
router.get('/:id',celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), usersController.getUserById);
router.patch('/me',celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), usersController.updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), usersController.updateUserAvatar);

module.exports = router;
