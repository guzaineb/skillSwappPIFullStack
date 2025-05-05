const httpMocks = require('node-mocks-http');
const Message = require('../../models/message.model');
const User = require('../../models/user.model');
const controller = require('../../controllers/messageController');

jest.mock('../../models/user.model');
jest.mock('../../models/message.model');

describe('Message Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsersForSidebar', () => {
    it('should return all users except logged-in one', async () => {
      const req = httpMocks.createRequest();
      req.user = { _id: 'user123' };

      const mockUsers = [{ _id: 'user456', fullName: 'Test User' }];
      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers),
      });

      const res = httpMocks.createResponse();
      await controller.getUsersForSidebar(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUsers);
    });
  });

  describe('getMessages', () => {
    it('should return messages between two users', async () => {
      const req = httpMocks.createRequest({
        params: { id: 'user2' },
      });
      req.user = { _id: 'user1' };

      const mockMessages = [
        { senderId: 'user1', receiverId: 'user2', content: 'Hello' },
      ];

      Message.find.mockResolvedValue(mockMessages);

      const res = httpMocks.createResponse();
      await controller.getMessages(req, res);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockMessages);
    });
  });

  describe('sendMessage', () => {
    it('should return 400 if IDs are missing', async () => {
      const req = httpMocks.createRequest({ body: {}, params: {} });
      const res = httpMocks.createResponse();

      await controller.sendMessage(req, res);
      expect(res.statusCode).toBe(400);
    });
  });
});
