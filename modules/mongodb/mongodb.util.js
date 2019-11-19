(function () {
    'use strict';

    const mongoose = require('mongoose');
    const bluebird = require('bluebird');
    const { mongodb: mongodbConfig } = require('../../config/mongodb-config');

    function init() {
        const options = {
            promiseLibrary: bluebird,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        const connectionString = prepareConnectionString(mongodbConfig);
        mongoose.connect(connectionString, options)
            .then((result) => {
                console.log(`MongoDB connection successful. DB: ${connectionString}`);
            })
            .catch((error) => {
                console.log(error.message);
                console.log(`Error occurred while connecting to DB: ${connectionString}`);
            });
    }

    function prepareConnectionString(config) {
        let connectionString = 'mongodb://';
        if (config.user) {
            connectionStirng += config.user + ':' + config.password;
        }
        connectionString += config.server + '/' + config.database;
        return connectionString;
    }
    module.exports = { init };
})();