import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';import User from '../models/user.js';
import { logger } from '../middleware/logger.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ConflictError from '../errors/ConflictError.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new UnauthorizedError('Invalid email or password.');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      logger.warn(`Incorrect password for email: ${email}`);
      throw new UnauthorizedError('Invalid email or password.');
    }const secretKey = JWT_SECRET;
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '7d' });
    logger.info(`User logged in successfully: ${email}`);
    res.send({ token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    logger.info(`Successfully retrieved ${users.length} users.`);
    res.send(users);
  } catch (err) {
    logger.error(`Error retrieving users: ${err.message}`);
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    logger.info(`Current user data retrieved: ${user.email}`);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      logger.warn(`Invalid user ID in getCurrentUser: ${req.user._id}`);
      return next(new BadRequestError('Invalid user ID.'));
    }
    logger.error(`Error in getCurrentUser: ${err.message}`);
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    logger.info(`User retrieved by ID: ${req.params.id}`);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      logger.warn(`Invalid ID in getUserById: ${req.params.id}`);
      return next(new BadRequestError('Invalid user ID.'));
    }
    logger.error(`Error in getUserById: ${err.message}`);
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`Attempt to create user with duplicate email: ${email}`);
      throw new ConflictError('Email already in use.');
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    };
    logger.info(`New user created: ${email}`);
    res.status(201).send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.warn(`Validation error while creating user: ${err.message}`);
      return next(new BadRequestError('Invalid user data.'));
    }
    logger.error(`Error creating user: ${err.message}`);
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new NotFoundError('User not found.');
    }
    logger.info(`User ${req.user._id} updated successfully.`);
    res.send(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.warn(`Validation error while updating user: ${err.message}`);
      return next(new BadRequestError('Invalid user data.'));
    }
    logger.error(`Error updating user: ${err.message}`);
    next(err);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUserAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUserAvatar) {
      throw new NotFoundError('User not found.');
    }
    logger.info(`User ${req.user._id} avatar updated successfully.`);
    res.send(updatedUserAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      logger.warn(`Validation error while updating avatar: ${err.message}`);
      return next(new BadRequestError('Invalid avatar data.'));
    }
    logger.error(`Error updating avatar: ${err.message}`);
    next(err);
  }
};
