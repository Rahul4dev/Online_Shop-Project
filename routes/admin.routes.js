const express = require("express");

const adminController = require('../controllers/admin.controller');

const router = express.Router();

//.... configurations of the router
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProducts);

module.exports = router;

