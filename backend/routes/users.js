const express = require('express');
const usersController = require('../controllers/users');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/signin',usersController.login);
router.post('/signup',usersController.createUser);

router.use(auth);

router.get('/', usersController.getAllUsers);
router.get('/me', usersController.getCurrentUser);
router.get('/:id', usersController.getUserById);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateUserAvatar);




module.exports = router;
