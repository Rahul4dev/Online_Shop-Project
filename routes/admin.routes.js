const express = require("express");

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middleware/image-upload');

const router = express.Router();

//.... configurations of the router
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProducts);

router.post('/products',imageUploadMiddleware , adminController.createNewProducts)

module.exports = router;

