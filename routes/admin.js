const express = require('express');
var router = express.Router();

/* GET admin dashboard */
router.get('/admin/dashboard', function(req, res, next) {
  res.render('admin-dashboard');  // Render the Jade (Pug) template
});

/* POST to add product (dummy implementation for now) */
router.post('/admin/add-product', function(req, res) {
  // As no database is used, we just redirect back to the dashboard.
  res.redirect('/admin/dashboard');
});

module.exports = router;
