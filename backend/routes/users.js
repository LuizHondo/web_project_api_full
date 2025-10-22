const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateUserAvatar);



module.exports = router;
