import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';

import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import { login, createUser } from './controllers/users.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import auth from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;
const { MONGODB_URI = 'mongodb://localhost:27017/aroundb' } = process.env;

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server will crash now');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (process.env.NODE_ENV !== 'production') {
    console.error('Error detected:', err);
  }

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Internal server error'
      : message,
  });
});

export const connectDB = (uri = MONGODB_URI) => mongoose.connect(uri);

export const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
