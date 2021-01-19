
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Smartphone = require('./smartphone');
const User = require('./user');

const orderSchema = new Schema({
    smartphones: [{ type: Schema.Types.ObjectId, ref: "Smartphone", required: true }], // array of products ids
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: 'completed' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema);