const Product = require('../models/product.model');

function getCart(req, res) {
  res.render('customer/cart/cart');
}


async function addCartItem(req, res) {
  let product;
  try {
    product = await Product.findById(req.body.productid);
  } catch (error) {
    next(error);
    return;
  }

  let cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;
  
  res.status(201).json({
    message:'Product Added',
    newTotalItems: cart.totalQuantity
  });
}

module.exports = {
  addCartItem : addCartItem,
  getCart: getCart
}