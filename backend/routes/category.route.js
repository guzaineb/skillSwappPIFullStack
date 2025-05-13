var express = require('express');


const router = express.Router();


const categoryController = require('../controllers/categoryController.js');
router.post('/addCategory', categoryController.upload.single('image'), categoryController.addCategory);


router.get('/categories', categoryController.getCategories);


router.get('/category/:id', categoryController.getCategory);

router.put('/updateCategory/:id', categoryController.upload.single('image'), categoryController.updateCategory);

router.delete('/deleteCategory/:id', categoryController.deleteCategory);
module.exports = router;