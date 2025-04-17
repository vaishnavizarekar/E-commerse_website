const express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;


const express = require('express');
const router = express.Router();

// Sample products data (this could be from a database)
const products = [
  { id: '1', name: 'Product 1', price: 10.00 },
  { id: '2', name: 'Product 2', price: 15.00 },
  { id: '3', name: 'Product 3', price: 20.00 },
];

// Route for shop page
router.get('/shop', (req, res) => {
  res.render('shop', { products });
});

// Route for cart page
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


module.exports = router;
