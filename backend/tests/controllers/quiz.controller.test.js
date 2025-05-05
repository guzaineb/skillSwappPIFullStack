const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const Quiz = require('../../models/quiz.model');
const quizController = require('../../controllers/quiz.controller');

const app = express();
app.use(express.json());

app.get('/quizzes', quizController.getAllQuizzes);
app.get('/quizzes/student/:email', quizController.getAllStudentQuizzes);
app.get('/quizzes/:id', quizController.getQuiz);
app.post('/quizzes', quizController.createQuiz);
app.delete('/quizzes/:id', quizController.deleteQuiz);
app.post('/quizzes/:id/answer', quizController.addQuizAnswer);

describe('Quiz Controller', () => {
  const sampleQuiz = {
    _id: '609e1297128dfb0015bfa3b4',
    creatorEmail: 'teacher@example.com',
    title: 'Sample Quiz',
    questions: [{ question: 'Q1', options: ['a', 'b'], correctAnswer: 'a' }],
    attempts: [],
  };

  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should get all quizzes', async () => {
    mockingoose(Quiz).toReturn([sampleQuiz], 'find');
    const res = await request(app).get('/quizzes');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Sample Quiz');
  });

  it('should get all quizzes for a student by email', async () => {
    const email = 'student@example.com';
    const quizWithAttempt = { ...sampleQuiz, attempts: [{ userEmail: email, answers: [] }] };
    mockingoose(Quiz).toReturn([quizWithAttempt], 'find');
    const res = await request(app).get(`/quizzes/student/${email}`);
    expect(res.statusCode).toBe(200);
    expect(res.body[0].attempts[0].userEmail).toBe(email);
  });

  it('should get a quiz by ID', async () => {
    mockingoose(Quiz).toReturn(sampleQuiz, 'findOne');
    const res = await request(app).get(`/quizzes/${sampleQuiz._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Sample Quiz');
  });

  it('should create a new quiz', async () => {
    mockingoose(Quiz).toReturn(sampleQuiz, 'save');
    const res = await request(app).post('/quizzes').send({
      creatorEmail: sampleQuiz.creatorEmail,
      title: sampleQuiz.title,
      questions: sampleQuiz.questions,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Sample Quiz');
  });

  it('should delete a quiz by ID', async () => {
    mockingoose(Quiz).toReturn({}, 'findOneAndDelete');
    const res = await request(app).delete(`/quizzes/${sampleQuiz._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Quiz deleted successfully');
  });

  it('should add an answer to a quiz', async () => {
    const updatedQuiz = {
      ...sampleQuiz,
      attempts: [{ userEmail: 'student@example.com', answers: ['a'] }],
    };

    mockingoose(Quiz).toReturn(sampleQuiz, 'findOne');
    mockingoose(Quiz).toReturn(updatedQuiz, 'save');

    const res = await request(app)
      .post(`/quizzes/${sampleQuiz._id}/answer`)
      .send({ userEmail: 'student@example.com', answers: ['a'] });

    expect(res.statusCode).toBe(200);
    expect(res.body.attempts[0].userEmail).toBe('student@example.com');
  });

  it('should handle quiz not found when adding answer', async () => {
    mockingoose(Quiz).toReturn(null, 'findOne');
    const res = await request(app)
      .post(`/quizzes/1234/answer`)
      .send({ userEmail: 'ghost@example.com', answers: ['a'] });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Quiz not found');
  });
});
