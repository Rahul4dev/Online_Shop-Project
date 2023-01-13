const Product = require('../models/product.model');
const Order = require('../models/order.model');

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', { products: products });
    } catch (error) {
        next(error);
        return;
    }    
}

function getNewProducts(req, res) {
    res.render("admin/products/new-products");
}

async function createNewProducts(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });
    
    try {
        await product.save();        
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/products/updateProduct', { product: product})       
    } catch (error) {
        next(error);
    }
} 

async function updateProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id,
    });

    if(req.file) {
        product.replaceImage(req.file.filename);
    }

    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }
    
    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);        
        await product.remove();
    } catch (error) {
        return next(error);
    }

    // res.redirect('/admin/products');
    // since we have used ajax request respond handling as we were redirecting the same page , So here we can't redirect but we can send response as a json data. thus through Ajax, we can just delete the product without reloading whole page again. 
    res.json({
        message: 'Deleted Product!',
    });
}

async function getOrders(req, res, next) {
	try {
		const orders = await Order.findAll();
		res.render("admin/orders/admin-orders", {
			orders: orders,
		});
	} catch (error) {
		next(error);
	}
}

async function updateOrder(req, res, next) {
	const orderId = req.params.id;
	const newStatus = req.body.newStatus;

	try {
		const order = await Order.findById(orderId);

		order.status = newStatus;

		await order.save();

		res.json({ message: "Order updated", newStatus: newStatus });
	} catch (error) {
		next(error);
	}
}


module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProducts: createNewProducts,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    // orders controllers
    getOrders: getOrders,
    updateOrder: updateOrder
}