const request = require('supertest');
const express = require('express');
const mockingoose = require('mockingoose');
const mongoose = require('mongoose');

const skillController = require('../../controllers/skillController');
const Skill = require('../../models/skill.model');

const app = express();
app.use(express.json());

// Dummy route binding
app.get('/skills', skillController.findAll);
app.post('/skills/add', skillController.addSkillWithLessons);

describe('Skill Controller Tests', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should fetch all skills with lesson count and total duration', async () => {
    const fakeSkills = [
      {
        _id: '123',
        skillname: 'Singing',
        category: new mongoose.Types.ObjectId(),
        description: 'Learn to sing',
        pricingType: 'free',
        price: 0,
        image: 'img.jpg',
        createdDate: new Date(),
        status: 'active',
        level: 'beginner',
        lessons: [{ title: 'Intro', duration: 10 }, { title: 'Breathing', duration: 15 }]
      }
    ];
    mockingoose(Skill).toReturn(fakeSkills, 'find');

    const res = await request(app).get('/skills');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].lessonCount).toBe(2);
    expect(res.body[0].totalDuration).toBe(25);
  });

  it('should create a skill with valid lessons and category', async () => {
    const categoryId = new mongoose.Types.ObjectId();
    const newSkill = {
      skillname: 'Painting',
      description: 'Acrylic techniques',
      category: categoryId,
      pricingType: 'paid',
      price: 20,
      image: 'img.png',
      status: 'active',
      level: 'intermediate',
      lessons: [
        { title: 'Basics', content: 'Intro', duration: 30 }
      ]
    };

    // Mock the save operation
    mockingoose(Skill).toReturn(newSkill, 'save');
    // Mock the populate operation
    mockingoose(Skill).toReturn({ 
      ...newSkill, 
      _id: new mongoose.Types.ObjectId(), 
      category: { _id: categoryId, name: 'Art' } 
    }, 'findOne');

    const res = await request(app)
      .post('/skills/add')
      .send(newSkill);

    expect(res.statusCode).toBe(201);
    expect(res.body.skillname).toBe('Painting');
  });
});