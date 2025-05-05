const mongoose = require('mongoose');
const httpMocks = require('node-mocks-http');
const User = require('../../models/user.model');
const Skill = require('../../models/skill.model'); 
const controller = require('../../controllers/profile.controllers'); 

//Test 3al profile controller

jest.mock('../../models/user.model');
jest.mock('../../models/skill.model');



describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('AddProfile', () => {
    it('should respond with Add Profile message', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      await controller.AddProfile(req, res);
      expect(res._getData()).toBe('Add Profile');
    });
  });

  describe('DeleteProfile', () => {
    it('should respond with Delete Profile message', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      await controller.DeleteProfile(req, res);
      expect(res._getData()).toBe('Delete Profile');
    });
  });

  describe('GetProfile', () => {
    it('should respond with Get Profile message', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      await controller.GetProfile(req, res);
      expect(res._getData()).toBe('Get Profile');
    });
  });

  describe('GetAllProfiles', () => {
    it('should respond with Get All Profiles message', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      await controller.GetAllProfiles(req, res);
      expect(res._getData()).toBe('Get All Profiles');
    });
  });

  describe('getSkills', () => {
    it('should return skills for valid user', async () => {
      const userId = '123';
      const mockUser = { enrolledSkills: ['skill1', 'skill2'] };
      const mockSkills = [{ _id: 'skill1' }, { _id: 'skill2' }];

      User.findById.mockResolvedValue(mockUser);
      Skill.find.mockResolvedValue(mockSkills);

      const req = httpMocks.createRequest({ params: { id: userId } });
      const res = httpMocks.createResponse();

      await controller.getSkills(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockSkills);
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);

      const req = httpMocks.createRequest({ params: { id: '123' } });
      const res = httpMocks.createResponse();

      await controller.getSkills(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('getUnobtainedSkills', () => {
    it('should return skills not enrolled by user', async () => {
      const userId = '123';
      const mockUser = { enrolledSkills: ['skill1'] };
      const mockSkills = [{ _id: 'skill2' }, { _id: 'skill3' }];

      User.findById.mockResolvedValue(mockUser);
      Skill.find.mockResolvedValue(mockSkills);

      const req = httpMocks.createRequest({ params: { id: userId } });
      const res = httpMocks.createResponse();

      await controller.getUnobtainedSkills(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockSkills);
    });
  });

  describe('addSkill', () => {
    it('should add a skill to user', async () => {
      const userId = '123';
      const skillId = '456';

      const mockUser = {
        enrolledSkills: [],
        save: jest.fn().mockResolvedValue(true),
      };
      const mockSkill = { _id: skillId };

      User.findById.mockResolvedValue(mockUser);
      Skill.findById.mockResolvedValue(mockSkill);

      const req = httpMocks.createRequest({
        params: { id: userId },
        body: { skillId },
      });
      const res = httpMocks.createResponse();

      await controller.addSkill(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().message).toBe('Skill added successfully');
    });

    it('should return 404 if user not found', async () => {
      User.findById.mockResolvedValue(null);
      const req = httpMocks.createRequest({
        params: { id: '123' },
        body: { skillId: '456' },
      });
      const res = httpMocks.createResponse();

      await controller.addSkill(req, res);
      expect(res.statusCode).toBe(404);
    });

    it('should return 400 if skill not found', async () => {
      const mockUser = { enrolledSkills: [] };
      User.findById.mockResolvedValue(mockUser);
      Skill.findById.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        params: { id: '123' },
        body: { skillId: '456' },
      });
      const res = httpMocks.createResponse();

      await controller.addSkill(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
});
