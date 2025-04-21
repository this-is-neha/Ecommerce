// delivery.router

const express = require('express');
const OrderController = require('./delivery.controller');

const router = express.Router();


router.post('/',OrderController.createOrder);


router.get('/',   OrderController.getOrders);


router.get('/:id',    OrderController.getOrderById);


router.delete('/:id', OrderController.deleteOrder);
router.get('/users/:userid', OrderController.getOrdersByUserId);

module.exports = router;

