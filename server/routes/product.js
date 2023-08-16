const { Router } = require('express');
const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

// connect to our Product Model
let Product = require('../models/product');

let productController = require('../controllers/product');


/* require authentication function */
function requireAuth(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect('/login');
    next();
}


/* GET Route for the Product List page - READ Operation */
router.get('/', productController.displayProductList);


/* GET Route for displaying the ADD page - CREATE Operation */
router.get('/add', productController.displayAddPage);

/* GET Route for processing the ADD page - CREATE Operation */
router.post('/add', productController.processAddPage);

/* GET Route for displaying Edit page - Update Operation */
router.get('/edit/:id', requireAuth, productController.displayEditPage);

/* GET Route for processing Edit page - Update Operation */
router.post('/edit/:id', requireAuth, productController.processEditPage);

/* GET to perfrom product Deletion - Delete Operation */
router.get('/delete/:id', requireAuth, productController.performDelete);

module.exports = router;