const express = require("express");

const router = express.Router();

//.... configurations of the router
router.get("/", function (req, res) {
  res.redirect('/products');
});

module.exports = router;
