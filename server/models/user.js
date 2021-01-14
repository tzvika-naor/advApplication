const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true , uniqueValidator: true },
    password: { type: String, required: true },
    phone: { type: String, required: true }
})
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);



