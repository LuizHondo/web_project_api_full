const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Invalid email or password.');
    }
    const secretKey =
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'dev-secret-key';
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid ID'));
    }
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid ID'));
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email already in use.');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, about, avatar, email, password: hash});
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    };
    res.status(201).send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Invalid user data'));
    }
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Invalid data'));
    }
    next(err);
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!updatedUserAvatar) {
      throw new NotFoundError('User not found');
    }
    res.send(updatedUserAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Invalid data'));
    }
    next(err);
  }
};