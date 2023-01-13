const express = require("express");

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middleware/image-upload');


const router = express.Router();

//.... configurations of the router
// in app.js /admin is already placed
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProducts);

router.post('/products',imageUploadMiddleware , adminController.createNewProducts)

router.get('/products/:id', adminController.getUpdateProduct);

router.post("/products/:id",imageUploadMiddleware, adminController.updateProduct);

router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;
