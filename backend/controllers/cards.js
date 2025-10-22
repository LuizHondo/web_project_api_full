const Card = require('../models/card');

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch((err) => res.status(500).json({ message: 'Erro interno no servidor', error: err.message }));
};

module.exports.getCardById = (req, res) => {
  Card.findById(req.params.id)
    .orFail(() => {
      const error = new Error('Card não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }

      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => res.status(201).json(newCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }

      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail(() => {
      const error = new Error('Card não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }

      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};

// module.exports.likeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.id,
//     { $addToSet: { likes: req.params.id } },
//     { new: true },
//   )
//     .orFail(() => {
//       const error = new Error('Card não encontrado');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((card) => res.json(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).json({ message: 'ID inválido' });
//       }

//       return res.status(err.statusCode || 500).json({ message: err.message });
//     });
// };
// module.exports.dislikeCard = (req, res) => {
//   Card.findByIdAndUpdate(
//     req.params.id,
//     { $pull: { likes: req.params.id } },
//     { new: true },
//   )
//     .orFail(() => {
//       const error = new Error('Card não encontrado');
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((card) => res.json(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         return res.status(400).json({ message: 'ID inválido' });
//       }

//       return res.status(err.statusCode || 500).json({ message: err.message });
//     });
// };
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id, // ID do card (correto)
    { $addToSet: { likes: req.user._id } }, // ID do usuário (corrigido!)
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Card não encontrado');
        error.statusCode = 404;
        throw error;
      }
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }
      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id, // ID do card (correto)
    { $pull: { likes: req.user._id } }, // ID do usuário (corrigido!)
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const error = new Error('Card não encontrado');
        error.statusCode = 404;
        throw error;
      }
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
      }
      return res.status(err.statusCode || 500).json({ message: err.message });
    });
};
