  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Smartphone = require('./smartphone');

const orderSchema = new Schema({
    smartphones: [{ type: Schema.Types.ObjectId, ref: "Smartphone" }], // array of products ids
    numberOfProducts: { type: Number }
    // status: { type: String }, // [in_progress, completed]
    // date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema);