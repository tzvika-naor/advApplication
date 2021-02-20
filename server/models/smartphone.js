const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const smartPhoneSchema = new Schema({
    phoneModel: { type: String },
    brand: { type: String },
    display: { type: String },
    processor: { type: String },
    frontCamera: { type: String },
    rearCamera: { type: String },
    batteryCapacity: { type: String },
    image: { type: String },
    price: { type: Number }

})
// Apply the uniqueValidator plugin to userSchema.
// smartPhoneSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Smartphone", smartPhoneSchema);
















