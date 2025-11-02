import Card from '../models/card.js';
import { logger } from '../middleware/logger.js';
import BadRequestError from '../errors/BadRequestError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

export const getAllCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((cards) => {
      logger.info(`Returned ${cards.length} cards.`);
      res.json(cards);
    })
    .catch((err) => {
      logger.error(`Error retrieving all cards: ${err.message}`);
      next(err);
    });
};

export const getCards = (req, res, next) => {
  const { owner } = req.query;
  const filter = owner ? { owner } : {};

  Card.find(filter)
    .sort({ createdAt: -1 })
    .then((cards) => {
      if (owner) {
        logger.info(`User ${req.user._id} retrieved ${cards.length} cards for owner ${owner}.`);
      } else {
        logger.info(`User ${req.user._id} retrieved ${cards.length} cards.`);
      }
      res.json(cards);
    })
    .catch((err) => {
      logger.error(`Error retrieving cards for ${req.user._id}: ${err.message}`);
      next(err);
    });
};

export const getCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Card not found.'))
    .then((card) => {
      logger.info(`Card ${card._id} retrieved successfully.`);
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        logger.warn(`Invalid card ID: ${req.params.id}`);
        return next(new BadRequestError('Invalid card ID.'));
      }
      logger.error(`Error retrieving card by ID: ${err.message}`);
      return next(err);
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      logger.info(`New card created by ${owner}: ${newCard.name}`);
      res.status(201).json(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        logger.warn(`Validation error while creating card: ${err.message}`);
        return next(new BadRequestError('Invalid card data.'));
      }
      logger.error(`Error creating card: ${err.message}`);
      next(err);
    });
};

export const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new NotFoundError('Card not found.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        logger.warn(`User ${req.user._id} tried to delete another user's card (${card.owner}).`);
        throw new ForbiddenError('You do not have permission to delete this card.');
      }
      return Card.findByIdAndDelete(req.params.id);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Card not found.');
      }
      logger.info(`Card ${deletedCard._id} deleted by user ${req.user._id}.`);
      res.json(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        logger.warn(`Invalid card ID during deletion: ${req.params.id}`);
        return next(new BadRequestError('Invalid card ID.'));
      }
      logger.error(`Error deleting card: ${err.message}`);
      next(err);
    });
};

export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        logger.warn(`Attempt to like a non-existent card: ${req.params.id}`);
        return next(new NotFoundError('Card not found.'));
      }
      logger.info(`User ${req.user._id} liked card ${card._id}.`);
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        logger.warn(`Invalid card ID during like: ${req.params.id}`);
        return next(new BadRequestError('Invalid card ID.'));
      }
      logger.error(`Error liking card: ${err.message}`);
      next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        logger.warn(`Attempt to dislike a non-existent card: ${req.params.id}`);
        return next(new NotFoundError('Card not found.'));
      }
      logger.info(`User ${req.user._id} removed like from card ${card._id}.`);
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        logger.warn(`Invalid card ID during dislike: ${req.params.id}`);
        return next(new BadRequestError('Invalid card ID.'));
      }
      logger.error(`Error disliking card: ${err.message}`);
      next(err);
    });
};
