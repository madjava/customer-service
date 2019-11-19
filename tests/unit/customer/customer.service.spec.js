'use strict';
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-mongoose');

const mongoose = require('mongoose');
const CustomerModule = require('../../../modules/customer/customer.module')();
const CustomerModel = CustomerModule.CustomerModel;
const CustomerService = CustomerModule.CustomerService;

const Fixtures = require('../../fixtures/fixtures');
const CustomerFixture = Fixtures.CustomerFixtures;
const ErrorFixture = Fixtures.ErrorFixtures;

let CustomerModelMock;

describe('CustomerService', () => {
    beforeEach(() => {
        CustomerModelMock = sinon.mock(CustomerModel);
    });
    afterEach(() => {
        CustomerModelMock.restore();
        mongoose.models = {};
        mongoose.modelSchemas = {};
        return mongoose.connection.close();
    });

    describe('createCustomer', () => {
        let newCustomer, expectedCreatedCustomer, expectedError;
        it('should successfully create new customer', () => {
            newCustomer = CustomerFixture.newCustomer;
            expectedCreatedCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('create')
                .withArgs(newCustomer)
                .resolves(expectedCreatedCustomer);

            return CustomerService.createCustomer(newCustomer)
                .then((data) => {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCreatedCustomer);
                });
        });

        it('should throw error while creating customer', () => {
            expectedError = ErrorFixture.unknownError;
            newCustomer = CustomerFixture.newCustomer;

            CustomerModelMock.expects('create')
                .withArgs(newCustomer)
                .rejects(expectedError);

            return CustomerService.createCustomer(newCustomer)
                .catch((error) => {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                })
        });
    });

    describe('fetchCustomers', () => {
        let expectedCustomers, expectedError;
        it('should successfully fetch all customers', () => {
            expectedCustomers = CustomerFixture.customers;

            CustomerModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .resolves(expectedCustomers);

            return CustomerService.fetchCustomers()
                .then((data) => {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedCustomers);
                });
        });

        it('should throw error while fetching all customers', () => {
            expectedError = ErrorFixture.unknownError;

            CustomerModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.fetchCustomers()
                .catch((error) => {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });

    describe('fetchCustomerById', () => {
        let expectedFetchedCustomer, customerId, expectedError;

        it('should successfully fetch the customer by id', () => {
            expectedFetchedCustomer = CustomerFixture.createdCustomer;
            customerId = expectedFetchedCustomer._id;

            CustomerModelMock.expects('findById')
                .withArgs(customerId)
                .chain('exec')
                .resolves(expectedFetchedCustomer);

            return CustomerService.fetchCustomerById(customerId)
                .then((data) => {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedFetchedCustomer);
                });
        });

        it('should throw error while fetching all customers', () => {
            customerId = CustomerFixture.createdCustomer._id;
            expectedError = ErrorFixture.unknownError;

            CustomerModelMock.expects('findById')
                .withArgs(customerId)
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.fetchCustomerById(customerId)
                .catch((error) => {
                    expect(error).to.deep.equal(expectedError)
                });
        });
    });

    describe('updateCustomer', () => {
        let existingCustomer, expectedModifiedCustomer, expectedError;

        it('should successfully update Customer', () => {
            expectedModifiedCustomer = CustomerFixture.modifiedCustomer;
            existingCustomer = CustomerFixture.modifiedCustomer;

            CustomerModelMock
                .expects('findByIdAndUpdate')
                .withArgs(existingCustomer._id, existingCustomer, { new: true })
                .chain('exec')
                .resolves(expectedModifiedCustomer);

            return CustomerService.updateCustomer(existingCustomer._id, existingCustomer)
                .then((data) => {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(expectedModifiedCustomer);
                });
        });

        it('should throw error while updating Customer', () => {
            expectedError = ErrorFixture.unknownError;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndUpdate')
                .withArgs(existingCustomer._id, existingCustomer, { new: true })
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.updateCustomer(existingCustomer._id, existingCustomer)
                .catch((error) => {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                })
        });
    });

    describe('deleteCustomer', () => {
        let existingCustomer, expectedError;

        it('should successfully remove the customer', () => {
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndRemove')
                .withArgs(existingCustomer._id)
                .chain('exec')
                .resolves(existingCustomer);

            return CustomerService.deleteCustomer(existingCustomer._id)
                .then((data) => {
                    CustomerModelMock.verify();
                    expect(data).to.deep.equal(existingCustomer);
                })
        });

        it('should throw error while removing customer', () => {
            expectedError = ErrorFixture.unknownError;
            existingCustomer = CustomerFixture.createdCustomer;

            CustomerModelMock.expects('findByIdAndRemove')
                .withArgs(existingCustomer._id)
                .chain('exec')
                .rejects(expectedError);

            return CustomerService.deleteCustomer(existingCustomer._id)
                .catch((error) => {
                    CustomerModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
        });
    });
});
