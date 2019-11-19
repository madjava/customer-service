
    const { Router } = require('express');
    const router = Router();
    const CustomerMiddleware = require('./customer.middleware');

    router.post('/', CustomerMiddleware.addCustomer, (req, res) => {
        res.status(201).json(req.response);
    });

    router.get('/', CustomerMiddleware.getCustomers, (req, res) => {
        res.status(200).json(req.response);
    });

    router.get('/:customerId', CustomerMiddleware.getCustomerById ,(req, res) => {
        res.status(200).json(req.response);
    });

    router.put('/:customerId', CustomerMiddleware.modifyCustomer, (req, res) => {
        res.status(200).json(req.response);
    });

    router.delete('/:customerId', CustomerMiddleware.removeCustomer, (req, res) => {
        res.status(200).json(req.response);
    });

    module.exports = router;