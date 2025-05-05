const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');

const authController = require('../../controllers/authController');

const app = express();
app.use(express.json());

// Mock only the most basic routes
app.post('/signup', authController.signup);

// Mock external dependencies
jest.mock('bcryptjs');

describe('Auth Controller - Minimal Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user with valid data', async () => {
      const mockUser = {
        _id: '507f191e810c19729de860ea',
        email: 'test@example.com',
        name: 'Test User',
        phone: '1234567890',
        role: 'learner',
        save: jest.fn().mockResolvedValue(true)
      };

      mockingoose(User).toReturn(null, 'findOne'); // No existing user
      mockingoose(User).toReturn(mockUser, 'save');
      bcrypt.hash.mockResolvedValue('hashedpassword');

      const res = await request(app)
        .post('/signup')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          phone: '1234567890',
          role: 'learner'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('should return error for missing required fields', async () => {
      const res = await request(app)
        .post('/signup')
        .send({
          email: 'test@example.com',
          // Missing other required fields
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});