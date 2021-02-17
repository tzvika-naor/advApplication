
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Smartphone = require('./smartphone');
const User = require('./user');

const orderSchema = new Schema({
    smartphones: [{
        id: { type: Schema.Types.ObjectId, ref: "Smartphone", required: true },
        quantity: { type: Number, required: true, default: 0 }
    }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: 'in_progress' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema);