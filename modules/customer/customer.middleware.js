const CustomerService = require('./customer.service');

function addCustomer(req, res, next) {
    CustomerService
        .createCustomer(req.body)
        .then((data) => {
            req.response = data;
            next();
        })
        .catch(error => next(error));
}

function getCustomers(req, res, next) {
    CustomerService
        .fetchCustomers()
        .then((data) => {
            req.response = data;
            next();
        })
        .catch(err => next(err));
}

function getCustomerById(req, res, next) {
    CustomerService
        .fetchCustomerById(req.params.customerId)
        .then((data) => {
            req.response = data;
            next();
        })
        .catch(err => next(err));
}

function modifyCustomer(req, res, next) {
    CustomerService
        .updateCustomer(req.params.customerId, req.body)
        .then((data) => {
            req.response = data;
            next();
        })
        .catch(err => next(err));
}

function removeCustomer(req, res, next) {
    CustomerService
        .deleteCustomer(req.params.customerId)
        .then((data) => {
            req.response = data;
            next();
        })
        .catch(err => next(err));
}

module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    modifyCustomer,
    removeCustomer
};