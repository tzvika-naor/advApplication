const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    smartphone: { type: mongoose.Schema.Types.ObjectId , ref: 'Smartphone'  },
    numberOfSmartphones: { type: Number   },
    // customerId: { type: String, required: true },
    totalPrice: { type: Number  }
})

module.exports = mongoose.model("Cart", cartSchema);