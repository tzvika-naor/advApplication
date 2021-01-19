
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    smartphones: [{ type: Schema.Types.ObjectId, ref: "Smartphone" }], // array of products ids
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: 'completed' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Order", orderSchema);