const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Meeting = require('../models/meeting.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

let testUser;
let testMeeting;
let authToken;

beforeAll(async () => {
  // Créer un utilisateur de test
  testUser = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });
  
  // Générer un token JWT pour l'authentification
  authToken = jwt.sign(
    { userId: testUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  // Nettoyer la base de données après les tests
  await Meeting.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('Meeting API Routes', () => {
  test('POST /api/meetings - should create a new meeting', async () => {
    const response = await request(app)
      .post('/api/meetings')
      .set('Cookie', [`token=${authToken}`])
      .send({
        title: 'Test Meeting',
        settings: {
          allowScreenShare: true,
          allowChat: true
        }
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.meeting).toHaveProperty('meetingId');
    
    // Sauvegarder l'ID de la réunion pour les tests suivants
    testMeeting = response.body.meeting;
  });
  
  test('GET /api/meetings/:meetingId - should get meeting details', async () => {
    const response = await request(app)
      .get(`/api/meetings/${testMeeting.meetingId}`);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.meeting.title).toBe('Test Meeting');
  });
  
  test('POST /api/meetings/:meetingId/join - should join a meeting', async () => {
    const response = await request(app)
      .post(`/api/meetings/${testMeeting.meetingId}/join`)
      .set('Cookie', [`token=${authToken}`]);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  test('POST /api/meetings/:meetingId/leave - should leave a meeting', async () => {
    const response = await request(app)
      .post(`/api/meetings/${testMeeting.meetingId}/leave`)
      .set('Cookie', [`token=${authToken}`]);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  test('PUT /api/meetings/:meetingId/end - should end a meeting