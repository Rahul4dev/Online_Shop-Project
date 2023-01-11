//middleware,  to look for incoming request and determine from where it is coming viz, user who already has a cart or who does'nt have a cart yet.
const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
  let cart;

  if(!req.session.cart) {
    cart = new Cart();
  }else {
    const sessionCart = req.session.cart;
    cart = new Cart(
      sessionCart.items, 
      sessionCart.totalQuantity, 
      sessionCart.totalPrice 
      );
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;