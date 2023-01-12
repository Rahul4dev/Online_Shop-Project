const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

//.... configurations of the router

//  /orders is already added in app.use..
router.get('/', ordersController.getOrders);

router.post('/', ordersController.addOrder);

module.exports = router;
