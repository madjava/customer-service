const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const bluebird = require('bluebird');
const Promise = bluebird.Promise;

const CustomerModule = require('../../../modules/customer/customer.module')();
const CustomerMiddleware = CustomerModule.CustomerMiddleware;
const CustomerService = CustomerModule.CustomerService;

const Fixtures = require('../../fixtures/fixtures');
const CustomerFixture = Fixtures.CustomerFixtures;
const ErrorFixture = Fixtures.ErrorFixtures;

let req, res, next;

describe('CustomerMiddleware', () => {
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    describe('addCustomer', () => {
        let createCustomer, createCustomerPromise, expectedCreatedCustomer, expectedError;
        beforeEach(() => {
            createCustomer = sinon.stub(CustomerService, 'createCustomer');
            req.body = CustomerFixture.newCustomer;
        });
        afterEach(() => {
            createCustomer.restore();
        });

        it('should succcessfully create new customer', () => {
            expectedCreatedCustomer = CustomerFixture.createdCustomer;
            createCustomerPromise = Promise.resolve(expectedCreatedCustomer);
            createCustomer
                .withArgs(req.body)
                .returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req, res, next);

            sinon.assert.callCount(createCustomer, 1);

            return createCustomerPromise.then(() => {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCreatedCustomer);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while creating thevn new customer', () => {
            expectedError = ErrorFixture.unknownError;
            createCustomerPromise = Promise.reject(expectedError);
            createCustomer
                .withArgs(req.body)
                .returns(createCustomerPromise);

            CustomerMiddleware.addCustomer(req, res, next);

            sinon.assert.callCount(createCustomer, 1);

            return createCustomerPromise.catch((error) => {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });
    });

    describe('getCustomers', () => {
        let fetchCustomers, fetchCustomerPromise, expectedCustomers, expectedError;

        beforeEach(() => {
            fetchCustomers = sinon.stub(CustomerService, 'fetchCustomers');
            req.body = {}
        });

        afterEach(() => {
            fetchCustomers.restore();
        });

        it('should successfully get all customers', () => {
            expectedCustomers = CustomerFixture.customers;
            fetchCustomerPromise = Promise.resolve(expectedCustomers);
            fetchCustomers.returns(fetchCustomerPromise);

            CustomerMiddleware.getCustomers(req, res, next);

            sinon.assert.callCount(fetchCustomers, 1);

            return fetchCustomerPromise.then(() => {
                expect(req.response).to.be.a('array');
                expect(req.response.length).to.equal(expectedCustomers.length);
                expect(req.response).to.deep.equal(expectedCustomers);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while getting all customers', () => {
            expectedError = ErrorFixture.unknownError;
            fetchCustomerPromise = Promise.reject(expectedError);
            fetchCustomers.returns(fetchCustomerPromise);

            CustomerMiddleware.getCustomers(req, res, next);

            sinon.assert.callCount(fetchCustomers, 1);

            return fetchCustomerPromise.catch((error) => {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });
    });

    describe('getCustomerById', () => {
        let fetchCustomerById, fetchCustomerByIdPromise, expectedError;
        beforeEach(() => {
            fetchCustomerById = sinon.stub(CustomerService, 'fetchCustomerById');
        });
        afterEach(() => {
            fetchCustomerById.restore();
        });

        it('should successfully fetch the customer by id', () => {
            expectedCustomer = CustomerFixture.createdCustomer;
            fetchCustomerByIdPromise = Promise.resolve(expectedCustomer);

            fetchCustomerById
                .withArgs(req.params.CustomerId)
                .returns(fetchCustomerByIdPromise);

            CustomerMiddleware.getCustomerById(req, res, next);

            sinon.assert.callCount(fetchCustomerById, 1);

            return fetchCustomerByIdPromise.then((data) => {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedCustomer);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while getting customer by id', () => {
            expectedError = ErrorFixture.unknownError;
            fetchCustomerByIdPromise = Promise.reject(expectedError);

            fetchCustomerById
                .withArgs(req.params.CustomerId)
                .returns(fetchCustomerByIdPromise);

            CustomerMiddleware.getCustomerById(req, res, next);

            sinon.assert.callCount(fetchCustomerById, 1);

            return fetchCustomerByIdPromise.catch((error) => {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });
    });

    describe('modifyCustomer', () => {
        let updateCustomer, updatedCustomerPromise, expectedModifiedCustomer, expectedError;

        beforeEach(() => {
            updateCustomer = sinon.stub(CustomerService, 'updateCustomer');
            req.body = CustomerFixture.modifiedCustomer;
            req.params.customerId = req.body._id;
        });

        afterEach(() => {
            updateCustomer.restore();
        });

        it('should successfully modify the customer details', () => {
            expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
            updatedCustomerPromise = Promise.resolve(expectedModifiedCustomer);

            updateCustomer
                .withArgs(req.params.customerId, req.body)
                .returns(updatedCustomerPromise);

            CustomerMiddleware.modifyCustomer(req, res, next);

            sinon.assert.callCount(updateCustomer, 1);

            return updatedCustomerPromise.then(() => {
                expect(req.response).to.be.a('object');
                expect(req.response).to.deep.equal(expectedModifiedCustomer);
                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while modifying customer by id', () => {
            expectedError = ErrorFixture.unknownError;
            updatedCustomerPromise = Promise.reject(expectedError);

            updateCustomer
                .withArgs(req.params.customerId, req.body)
                .returns(updatedCustomerPromise);

            CustomerMiddleware.modifyCustomer(req, res, next);

            sinon.assert.callCount(updateCustomer, 1);

            return updatedCustomerPromise.catch((error) => {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError)
            });
        });
    });

    describe('removeCustomer', () => {
        let deleteCustomer, deleteCustomerPromise, expectedCustomer, expectedError;

        beforeEach(() => {
            deleteCustomer = sinon.stub(CustomerService, 'deleteCustomer');
        });

        afterEach(() => {
            deleteCustomer.restore();
        });

        it('should successfully remove the customer', () => {
            expectedCustomer = CustomerFixture.createdCustomer;
            deleteCustomerPromise = Promise.resolve(expectedCustomer);

            deleteCustomer
                .withArgs(req.params.customerId)
                .returns(deleteCustomerPromise)

            CustomerMiddleware.removeCustomer(req, res, next);

            sinon.assert.callCount(deleteCustomer, 1);

            return deleteCustomerPromise
                .then(() => {
                    expect(req.response).to.be.a('object');
                    expect(req.response).to.deep.equal(expectedCustomer);
                    sinon.assert.callCount(next, 1);
                });
        });

        it('should throw error while removing customer', () => {
            expectedError = ErrorFixture.unknownError;
            deleteCustomerPromise = Promise.reject(expectedError);

            deleteCustomer
                .withArgs(req.params.customerId)
                .returns(deleteCustomerPromise);

            CustomerMiddleware.removeCustomer(req, res, next);

            sinon.assert.callCount(deleteCustomer, 1);

            return deleteCustomerPromise.catch((error) => {
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });
    });
});