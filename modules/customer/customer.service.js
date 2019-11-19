const CustomerModel = require('./customer.model');

const createCustomer = (customer) => {
    return CustomerModel.create(customer);
};

const fetchCustomers = () => {
    return CustomerModel.find({}).exec();
};

const fetchCustomerById = (customerId) => {
    return CustomerModel.findById(customerId).exec();
};

const updateCustomer = (customerId, customer) => {
    return CustomerModel
        .findByIdAndUpdate(customerId, customer, { new: true })
        .exec();
}

const deleteCustomer = (customerId) => {
    return CustomerModel
        .findByIdAndRemove(customerId)
        .exec();
}

module.exports = {
    createCustomer,
    fetchCustomers,
    fetchCustomerById,
    updateCustomer,
    deleteCustomer
}; 
