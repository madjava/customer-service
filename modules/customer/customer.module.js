const CustomerController = require('./customer.controller');
const CustomerMiddleware = require('./customer.middleware');
const CustomerService = require('./customer.service');
const CustomerModel = require('./customer.model');


function init() {
    return {
        CustomerController,
        CustomerMiddleware,
        CustomerService,
        CustomerModel
    }
} 

module.exports = init;