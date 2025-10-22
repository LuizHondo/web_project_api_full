const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB', err));

// Rotas
app.use((req, res, next) => {
  req.user = { _id: '68d803bdfb541ef6fa9e8fb4' }; // substitua por um ObjectId real do banco
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
// Subindo servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
