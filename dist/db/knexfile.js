'use strict';

require('dotenv').config();
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DEV_DB_NAME,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PWD,
      host: "postgres-database"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PWD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/Testmigrations',
      tableName: 'knex_migrations'
    }
  }

};
//# sourceMappingURL=knexfile.js.map