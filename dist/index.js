'use strict';

const debug = require('debug')('server:debug');
const config = require('./config/config');
const express = require('express');
const app = express();
const listen = app.listen(config.port, () => {
    debug(`server is running in port ${config.port} and in ${config.name} mode`);
    console.log(`server is running in port ${config.port} and in ${config.name} mode`);
});

module.exports = app;
module.exports.port = listen.address().port;
//# sourceMappingURL=index.js.map