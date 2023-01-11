const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

//.... configurations of the router

router.post('/items' , cartController.addCartItem );   //  /cart is added in app.use

module.exports = router;
