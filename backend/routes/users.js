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
router.get('/:id', usersController.getUserById);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateUserAvatar);




module.exports = router;
