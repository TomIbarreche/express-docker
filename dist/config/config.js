'use strict';

const db = require('../db/db');
const dotenv = require('dotenv').config();
const env = process.env.NODE_ENV;

const development = {
    "name": process.env.DEV_SRV_NAME,
    "host": process.env.DEV_HOT,
    "database": db,
    "port": process.env.DEV_PORT
};

const production = {
    "name": "Server Production",
    "database": "mongodb://localhost:27017/production",
    "port": 3000
};

const test = {
    "name": process.env.TEST_SRV_NAME,
    "host": process.env.TEST_HOST,
    "database": db,
    "port": process.env.TEST_PORT
};

const config = {
    "development": development,
    "production": production,
    "test": test
};
module.exports = config[env];
//# sourceMappingURL=config.js.map