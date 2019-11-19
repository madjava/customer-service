const chai = require('chai');
const expect = chai.expect;

const MongoDBUtil = require('../../../modules/mongodb/mongodb.module').MongoDBUtil;

describe('MongoDBUtil', function () {
    

    describe('mongodb.util file', () => {
        it('should read the mongodb.module file', function () {
            expect(MongoDBUtil).to.be.a('object');
        });

         it('should confirm init function exists',  function () {
             expect(MongoDBUtil.init).to.be.a('function');
         });
    });

});