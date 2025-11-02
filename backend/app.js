const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const usersController = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/aroundb')
.then(() => console.log('✅ Conectado ao MongoDB'))
.catch((err) => console.error('❌ Erro ao conectar ao MongoDB', err));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post('/signin', usersController.login);
app.post('/signup', usersController.createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (process.env.NODE_ENV !== 'production') {
    console.error('⚠️ Erro detectado:', err);
  }

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Erro interno no servidor'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
