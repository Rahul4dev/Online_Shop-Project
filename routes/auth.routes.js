const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

//.... configurations of the router

router.get("/signup", authController.getSignup);

router.post("/signup", authController.signup);

router.get("/login", authController.getLogin);

router.post('/login', authController.login);

router.post("/logout", authController.logout);

module.exports = router;
