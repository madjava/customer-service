const chai = require('chai');
const expect = chai.expect;

const MongoDBModule = require('../../../modules/mongodb/mongodb.module');

describe('MongoDBModule', function () {
    
    describe('mongodb.module file', () => {
        it('should read the mongodb.module file', function () {
            expect(MongoDBModule).to.be.a('object');
        });

        it('should confirm MongoDBUtil exists', function() {
            expect(MongoDBModule.MongoDBUtil).to.be.a('object');
        });
    });

});