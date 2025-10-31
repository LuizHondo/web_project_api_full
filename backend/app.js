const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const usersController = require('./controllers/users');
const validator = require('validator');
const errors = require('celebrate').errors;
const { requestLogger, errorLogger } = require('./middleware/logger');
const cors = require('cors');
const auth = require('./middleware/auth');

const app = express();
const PORT = 3001;

app.use(requestLogger);

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB', err));

// Rotas que NÃO precisam de autenticação
app.post('/signin', usersController.login);
app.post('/signup', usersController.createUser);

// Middleware de autenticação para todas as outras rotas
app.use(auth);

// Rotas protegidas
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);


app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).send({ message });
});

// Subindo servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
