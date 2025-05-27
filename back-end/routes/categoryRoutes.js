const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.index);
router.get('/:id', CategoryController.show);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.edit);
router.delete('/:id', CategoryController.delete);

module.exports = router;
