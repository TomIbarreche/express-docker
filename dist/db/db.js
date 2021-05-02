'use strict';

const knexfile = require('./knexfile.js');
const environment = process.env.NODE_ENV;
console.log(environment);
const config = require('./knexfile')[environment];
const knex = require('knex');
module.exports = require('knex')(config);
//# sourceMappingURL=db.js.map