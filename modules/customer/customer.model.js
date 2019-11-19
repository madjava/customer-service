const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

module.exports = mongoose.model('customers', customerSchema);