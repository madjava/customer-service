const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

const CustomerModule = require('../../../modules/customer/customer.module');

describe('CustomerModule', () => {
    describe('customer.module file', () => {
        beforeEach(() => {
            mongoose.models = {};
            mongoose.modelSchemas = {};
        });
        it('should confirm CustomerModule function exists', () => {
            expect(CustomerModule).to.be.a('function');
        });

        it('should confirm CustomerModule function returns an object', () => {
            expect(CustomerModule()).to.be.a('object');
        });

        it('should confirm CustomerController function exists', () => {
            expect(CustomerModule().CustomerController).to.be.a('function');
        });

        it('should confirm CustomerMiddleware object exists', () => {
            expect(CustomerModule().CustomerMiddleware).to.be.a('object');
        });

        it('should confirm CustomerService object exists', () => {
            expect(CustomerModule().CustomerService).to.be.a('object');
        });

        it('should confirm CustomerModel function exists', () => {
            expect(CustomerModule().CustomerModel).to.be.a('function');
        });
    });
});