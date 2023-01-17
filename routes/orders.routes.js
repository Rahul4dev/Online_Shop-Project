const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

//.... configurations of the router

//  /orders is already added in app.use..
router.get('/', ordersController.getOrders);

router.post('/', ordersController.addOrder);

router.get('/success', ordersController.getSuccess);

router.get('/cancel', ordersController.getFailure);
module.exports = router;
