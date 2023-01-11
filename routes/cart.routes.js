const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

//.... configurations of the router

//  /cart is already added in app.use..
router.get('/', cartController.getCart);

router.post('/items' , cartController.addCartItem );   


module.exports = router;
