const stripe = require("stripe")

const Order = require("../models/order.model");
const User = require("../models/user.model");

const stripeObj = stripe(process.env.STRIPE_PRIVATE_KEY);

async function getOrders(req, res, next) {
	try {
		const orders = await Order.findAllForUser(res.locals.uid);
		res.render("customer/orders/all-orders", { orders: orders });
	} catch (error) {
		next(error);
	}
}

async function addOrder(req, res, next) {
	const cart = res.locals.cart;

	let userDocument;
	try {
		userDocument = await User.findById(res.locals.uid);
	} catch (error) {
		return next(error);
	}

	const order = new Order(cart, userDocument);

	try {
		await order.save();
	} catch (error) {
		return next(error);
	}

	req.session.cart = null; // to reset the cart after placing order but cart const still have the object blueprint
  
	// since cart const is not mapped like line_items, we have to map it's items.
	// payment section
  const session = await stripeObj.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: cart.items.map(function (item) {
			return {
				price_data: {
					currency: "INR",
					product_data: {
						name: item.product.title,
					},
					unit_amount_decimal: +item.product.price.toFixed(2) * 100,
				},
				quantity: item.quantity,
			};
		}),
		mode: "payment",
		success_url: `${process.env.SERVER_URL}/orders/success`,
		cancel_url: `${process.env.SERVER_URL}/orders/cancel`,
	});

	res.redirect(303, session.url);
	
}

function getSuccess(req, res){
	res.render('customer/orders/success');
}

function getFailure(req, res) {
	res.render("customer/orders/cancel");
}

module.exports = {
	addOrder: addOrder,
	getOrders: getOrders,
	getSuccess: getSuccess,
	getFailure: getFailure
};
