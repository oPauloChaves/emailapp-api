require('dotenv').config();
const config = require('./config');

// ref: https://devhints.io/knex
const options = {
  client: config.db.client,
  connection: config.db.url || {
    filename: 'db/data/dev.sqlite3'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/db/migrations`
  },
  seeds: {
    directory: `${__dirname}/db/seeds`
  },
  debug: config.db.debug,
  useNullAsDefault: config.db.client === 'sqlite3'
};

if (config.db.client !== 'sqlite3') {
  options.pool = {
    min: 2,
    max: 10
  };
}

const configs = {
  development: { ...options },
  test: {
    ...options,
    connection: config.db.url || { filename: 'db/data/test.sqlite3' }
  },
  production: {
    ...options,
    connection: config.db.url || { filename: 'db/data/prod.sqlite3' }
  }
};

module.exports = configs[process.env.NODE_ENV];
