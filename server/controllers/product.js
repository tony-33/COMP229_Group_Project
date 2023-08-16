let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Product = require('../models/product');

module.exports.displayProductList = (req, res, next) => {
    Product.find((err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('product/list', {title: 'Products', ProductList: productList, displayName: req.user ? req.user.displayName : ''});            
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('product/add', {title: 'Add product', displayName: req.user ? req.user.displayName : ''});            
}

module.exports.processAddPage = (req, res, next) => {
    let newProduct = Product({
        "name": req.body.name,
        "price": req.body.price,
        "quantity": req.body.quantity
    });

    Product.create(newProduct, (err, Product) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the product list
            res.redirect('/product-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Product.findById(id, (err, productToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('product/edit', {title: 'Edit Product', product: productToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });

}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedProduct = Product({
        "_id": id,
        "name": req.body.name,
        "price": req.body.price,
        "quantity": req.body.quantity
    });

    Product.updateOne({_id: id}, updatedProduct, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the product list
            res.redirect('/product-list');

        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Product.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the product list
            res.redirect('/product-list');
        }
    });
}