
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Smartphone = require('./smartphone');
const User = require('./user');

const orderSchema = new Schema({
    smartphones: [{ id: { type: Schema.Types.ObjectId, countref: "Smartphone" , required: true }, itemCount: { type: Number , required: true}}], // array of smartphones id's and items count
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number },
    status: { type: String, default: 'in_progress' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema);