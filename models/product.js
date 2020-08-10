var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    category: String,
    name: String,
    image: String,
    detail1: String,
    detail2: String,
    detail3: String,
    detail4: String,
    detail5: String,
    price: Number,
    quantity: Number,
    created: {type: Date, default: Date.now},
});
module.exports = mongoose.model("Product", productSchema);