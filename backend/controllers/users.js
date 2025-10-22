const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: 'Erro interno no servidor', error: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Usuário não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' })
      }
      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Dados inválidos', error: err.message })
      };
      return res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.body._id,{ name, about })
    .then((updatedUser) => {
      if(!updatedUser){
        return res.status(404).json({message:'Usuário não encontrado'})
      }
      return res.status(200).json(updatedUser)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Dados inválidos', error: err.message });
      }
      return res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.body._id,{ avatar })
    .then((updatedUserAvatar) => {
      if(!updatedUserAvatar){
        return res.status(404).json({message:'Usuário não encontrado'})
      }
      return res.status(200).json(updatedUser)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Dados inválidos', error: err.message });
      }
      return res.status(500).json({ message: 'Erro interno no servidor', error: err.message });
    });
};


