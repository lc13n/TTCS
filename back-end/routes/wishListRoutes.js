const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/WishListController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/view', authenticate, WishlistController.viewWishList);
router.post('/add', authenticate, WishlistController.addToWishList);
router.delete('/remove', authenticate, WishlistController.removeFromWishList);
router.delete('/add-all', authenticate, WishlistController.addAll);

module.exports = router;