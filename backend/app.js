import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load .env if present; fall back to .env.example in non-production to avoid crashes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = fs.existsSync(path.join(__dirname, '.env'))
  ? path.join(__dirname, '.env')
  : (process.env.NODE_ENV !== 'production' && fs.existsSync(path.join(__dirname, '.env'))
    ? path.join(__dirname, '.env')
    : null);
if (envFile) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';

import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
import { login, createUser } from './controllers/users.js';
import { requestLogger, errorLogger } from './middleware/logger.js';
import auth from './middleware/auth.js';

const app = express();
const { PORT } = process.env;
const { MONGODB_URI } = process.env;

app.use(express.json());
app.use(helmet());
app.set('trust proxy', 1);
const corsOptions = {
  origin: [
    'https://www.luizhondo.com',
    'https://luizhondo.com',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(requestLogger);

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

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

export const connectDB = (uri = MONGODB_URI || "aroundb", dbName = process.env.DB_NAME) => mongoose.connect(uri, { dbName });

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
