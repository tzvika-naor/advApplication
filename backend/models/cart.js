const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: { type: String, required: true },
    numberOfProucts: { type: Number, required: true },
    customerId: { type: String, required: true },
    totalPrice: { type: String, required: true }
})

module.exports = mongoose.model("Cart", cartSchema);