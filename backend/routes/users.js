const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateUserAvatar);
router.post('/signin',usersController.login);
router.post('/signup',usersController.createUser);




module.exports = router;
