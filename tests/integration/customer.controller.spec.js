const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');

const Fixtures = require('../fixtures/fixtures');
const CustomerFixture = Fixtures.CustomerFixtures;

const baseUri = '/customers';
let mongoServer;
const opts = { useFindAndModify: true, useUnifiedTopology: true };

before((done) => {
    mongoServer = new MongoMemoryServer();
    mongoServer
        .getConnectionString()
        .then((mongoUri) => {
            return mongoose.connect(mongoUri, opts, (err) => {
                if (err) done(err);
            });
        })
        .then(() => done());
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

let testData = {
    existingCustomer: {},
    modifiedCustomer: CustomerFixture.modifiedCustomer
}

describe('CustomerController', () => {

    describe(`POST ${baseUri}`, () => {
        it('should add a new customer', (done) => {
            request(app)
                .post(baseUri)
                .send(CustomerFixture.newCustomer)
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.not.equal({});
                    expect(res.body._id).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(CustomerFixture.createdCustomer.firstName);
                    done();
                });
        });
    });

    describe(`GET ${baseUri}`, () => {
        it('should get all customers', (done) => {
            request(app)
                .get(baseUri)
                .end((req, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.equal(0);
                    testData.existingCustomer = res.body[0];
                    done();
                });
        });
    });

    describe(`GET ${baseUri}/:customerId`, () => {

        it('should get a customer by id', (done) => {
            request(app)
                .get(`${baseUri}/${testData.existingCustomer._id}`)
                .end((req, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body).to.deep.equal(testData.existingCustomer);
                    expect(res.body.firstName).to.equal(testData.existingCustomer.firstName);
                    done();
                });
        });

    });

    describe(`PUT ${baseUri}/:customerId`, () => {

        it('should modify existing customer', () => {
            testData.modifiedCustomer._id = testData.existingCustomer._id;
            request(app)
                .put(`${baseUri}/${testData.modifiedCustomer._id}`)
                .send(testData.modifiedCustomer)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(testData.modifiedCustomer.firstName);
                    expect(res.body.adddress).to.equal(testData.modifiedCustomer.adddress);
                });
        });

    });

    describe(`DELETE ${baseUri}/:customerId`, () => {
        it('should remove an existing customer', (done) => {
            request(app)
                .delete(`${baseUri}/${testData.existingCustomer._id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.firstName).to.not.equal(undefined);
                    expect(res.body.firstName).to.equal(testData.existingCustomer.firstName);
                    done();
                });
        });
    });
});
