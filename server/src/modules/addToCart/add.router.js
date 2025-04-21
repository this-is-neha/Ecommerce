const express = require('express');
const cartCtrl = require('./add.controller');
const router = express.Router();

router.post('/add/:userId', cartCtrl.addToCart);
router.get('/cart/:userId', cartCtrl.getCartItems);
router.delete('/remove/:userId', cartCtrl.removeFromCart)

module.exports = router;
