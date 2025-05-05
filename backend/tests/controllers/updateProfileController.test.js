const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');

// Mock bcrypt
jest.mock('bcryptjs');

// Create test app
const app = express();
app.use(express.json());

// Mock authenticated user middleware
app.use((req, res, next) => {
  req.user = { id: '507f191e810c19729de860ea' };
  next();
});

// Only import and test the updatePassword function
const { updatePassword } = require('../../controllers/updateProfileController');
app.put('/update-password', updatePassword);

describe('UpdateProfileController - Password Only', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  describe('updatePassword', () => {
    it('should update password with valid current password', async () => {
      const mockUser = {
        _id: '507f191e810c19729de860ea',
        email: 'test@example.com',
        name: 'Test User',
        phone: '1234567890',
        password: 'oldHashedPassword',
        save: jest.fn().mockResolvedValue(true)
      };

      mockingoose(User).toReturn(mockUser, 'findOne');
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue('newHashedPassword');

      const res = await request(app)
        .put('/update-password')  // Note: Fixed typo in route to match your controller
        .send({
          currentPassword: 'correctPassword123',  // Ensure meets minimum length
          newPassword: 'newValidPassword123'     // Ensure meets minimum length
        });

      console.log('Response:', res.body);  // Debug output
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should reject incorrect current password', async () => {
      const mockUser = {
        _id: '507f191e810c19729de860ea',
        email: 'test@example.com',
        password: 'oldHashedPassword'
      };

      mockingoose(User).toReturn(mockUser, 'findOne');
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app)
        .put('/update-password')
        .send({
          currentPassword: 'wrongPassword123',  // Ensure meets minimum length
          newPassword: 'newValidPassword123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});