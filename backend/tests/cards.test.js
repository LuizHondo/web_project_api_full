import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app, { connectDB } from '../app.js';
import User from '../models/user.js';
import Card from '../models/card.js';

describe('Cards routes', () => {
  let mongoServer;
  let userOne;
  let userTwo;
  let tokenUserOne;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  beforeEach(async () => {
    if (mongoose.connection.readyState) {
      await mongoose.connection.db.dropDatabase();
    }

    const passwordHash = await bcrypt.hash('test-password', 10);

    userOne = await User.create({
      name: 'User One',
      about: 'Tester',
      avatar: 'https://example.com/avatar1.png',
      email: 'user1@example.com',
      password: passwordHash,
    });

    userTwo = await User.create({
      name: 'User Two',
      about: 'Tester',
      avatar: 'https://example.com/avatar2.png',
      email: 'user2@example.com',
      password: passwordHash,
    });

    tokenUserOne = jwt.sign({ _id: userOne._id }, 'dev-secret-key', { expiresIn: '7d' });
  });

  test('POST /cards creates a card owned by the authenticated user', async () => {
    const response = await request(app)
      .post('/cards')
      .set('Authorization', `Bearer ${tokenUserOne}`)
      .send({
        name: 'Test Card',
        link: 'https://example.com/card.jpg',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      name: 'Test Card',
      link: 'https://example.com/card.jpg',
      owner: String(userOne._id),
    });

    const cardInDb = await Card.findById(response.body._id);
    expect(cardInDb).not.toBeNull();
    expect(String(cardInDb.owner)).toBe(String(userOne._id));
  });

  test('GET /cards returns all cards sorted by newest first', async () => {
    const older = await Card.create({
      name: 'Older Card',
      link: 'https://example.com/older.jpg',
      owner: userOne._id,
      createdAt: new Date('2020-01-01T00:00:00Z'),
    });

    const newer = await Card.create({
      name: 'Newer Card',
      link: 'https://example.com/newer.jpg',
      owner: userTwo._id,
      createdAt: new Date('2025-01-01T00:00:00Z'),
    });

    const response = await request(app)
      .get('/cards')
      .set('Authorization', `Bearer ${tokenUserOne}`)
      .expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]._id).toBe(String(newer._id));
    expect(response.body[1]._id).toBe(String(older._id));
  });

  test("DELETE /cards/:id forbids deleting another user's card", async () => {
    const card = await Card.create({
      name: 'Protected Card',
      link: 'https://example.com/protected.jpg',
      owner: userTwo._id,
    });

    const response = await request(app)
      .delete(`/cards/${card._id}`)
      .set('Authorization', `Bearer ${tokenUserOne}`)
      .expect(403);

    expect(response.body.message).toBe('You do not have permission to delete this card.');

    const stillExists = await Card.findById(card._id);
    expect(stillExists).not.toBeNull();
  });
});
