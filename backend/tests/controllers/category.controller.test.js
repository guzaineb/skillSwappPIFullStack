const httpMocks = require('node-mocks-http');
const Category = require('../../models/category.model');
const controller = require('../../controllers/categoryController');

// Mock fs and multer
jest.mock('fs');
jest.mock('../../models/category.model');

describe('Category Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addCategory', () => {
    it('should add a category successfully', async () => {
      const req = httpMocks.createRequest({
        body: { title: 'Test', description: 'Description' },
        file: { filename: 'test.png' }
      });
      const res = httpMocks.createResponse();

      Category.findOne.mockResolvedValue(null);
      Category.prototype.save = jest.fn().mockResolvedValue(true);

      await controller.addCategory(req, res);
      const data = res._getJSONData();

      expect(res.statusCode).toBe(201);
      expect(data.message).toBe('Category added successfully');
    });

    it('should return 400 if missing fields', async () => {
      const req = httpMocks.createRequest({ body: {}, file: null });
      const res = httpMocks.createResponse();

      await controller.addCategory(req, res);
      expect(res.statusCode).toBe(400);
    });

    it('should return 409 if category exists', async () => {
      const req = httpMocks.createRequest({
        body: { title: 'Test', description: 'Description' },
        file: { filename: 'test.png' }
      });
      const res = httpMocks.createResponse();

      Category.findOne.mockResolvedValue({ title: 'Test' });

      await controller.addCategory(req, res);
      expect(res.statusCode).toBe(409);
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      const mockCategories = [{ title: 'Cat1' }, { title: 'Cat2' }];
      Category.find.mockResolvedValue(mockCategories);

      await controller.getCategories(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockCategories);
    });
  });

  describe('getCategory', () => {
    it('should return category by ID', async () => {
      const mockCategory = { title: 'Test' };
      Category.findById.mockResolvedValue(mockCategory);

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await controller.getCategory(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData().category).toEqual(mockCategory);
    });

    it('should return 404 if category not found', async () => {
      Category.findById.mockResolvedValue(null);

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await controller.getCategory(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('updateCategory', () => {
    it('should update category if found', async () => {
      const req = httpMocks.createRequest({
        params: { id: '1' },
        body: { title: 'Updated', description: 'Updated desc' },
        file: { filename: 'new-image.png' }
      });
      const res = httpMocks.createResponse();

      const updatedCategory = { title: 'Updated', description: 'Updated desc' };
      Category.findByIdAndUpdate.mockResolvedValue(updatedCategory);

      await controller.updateCategory(req, res);
      expect(res.statusCode).toBe(201);
      expect(res._getJSONData().message).toBe('Category updated successfully');
    });

    it('should return 404 if not found', async () => {
      Category.findByIdAndUpdate.mockResolvedValue(null);

      const req = httpMocks.createRequest({ params: { id: '1' }, body: {} });
      const res = httpMocks.createResponse();

      await controller.updateCategory(req, res);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('deleteCategory', () => {
    it('should delete category if found', async () => {
      Category.findByIdAndDelete.mockResolvedValue({ _id: '1' });

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await controller.deleteCategory(req, res);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().message).toBe('Category deleted successfully');
    });

    it('should return 404 if not found', async () => {
      Category.findByIdAndDelete.mockResolvedValue(null);

      const req = httpMocks.createRequest({ params: { id: '1' } });
      const res = httpMocks.createResponse();

      await controller.deleteCategory(req, res);
      expect(res.statusCode).toBe(404);
    });
  });
});
