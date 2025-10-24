const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Invalid email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Invalid email or password'));
          }

          const token = jwt.sign(
            { _id: user._id },
            'super-strong-secret',
            { expiresIn: '7d' }
          );
          res.send({ token });
        });
    })
    .catch((err) => {
      res.status(401).json({ message: err.message });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: 'Internal server error', error: err.message }));
};
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID' })
      }
      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};
module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID' })
      }
      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash)=>
    User.create({ name, about, avatar, email, password: hash})
  ) .then((newUser) =>{
      const userWithoutPassword = {_id: newUser._id,name: newUser.name,about: newUser.about,avatar: newUser.avatar,email: newUser.email};
      res.status(201).json(userWithoutPassword)
    }
  )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err.message })
      };
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.body._id,{ name, about })
    .then((updatedUser) => {
      if(!updatedUser){
        return res.status(404).json({message:'User not found'})
      }
      return res.status(200).json(updatedUser)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err.message });
      }
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.body._id,{ avatar })
    .then((updatedUserAvatar) => {
      if(!updatedUserAvatar){
        return res.status(404).json({message:'User not found'})
      }
      return res.status(200).json(updatedUser)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid data', error: err.message });
      }
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    });
};
