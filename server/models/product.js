let mongoose = require('mongoose');

// create a model class
let productModel = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
},
{
    collection: "items"
});

module.exports = mongoose.model('Product', productModel);