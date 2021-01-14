const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
})
// Apply the uniqueValidator plugin to userSchema.
productSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Product", productSchema);


