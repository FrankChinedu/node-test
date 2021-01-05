/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { Op } = require('sequelize');
const dotenv = require('dotenv');
const consola = require('consola');

dotenv.config();

const Connections = {};

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

Connections.postgres = {
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  options: {
    operatorsAliases,
    pool: {
      max: 5,
      min: 0,
      idle: 5000,
      evict: 5000,
    },
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    timezone: 'Africa/Lagos',
  },
};

Connections.postgres_test = {
  database: process.env.POSTGRES_TEST_DATABASE,
  username: process.env.POSTGRES_TEST_USERNAME,
  password: process.env.POSTGRES_TEST_PASSWORD,
  options: {
    operatorsAliases,
    pool: {
      max: 1,
      min: 0,
      idle: 5000,
      evict: 5000,
    },
    host: process.env.POSTGRES_TEST_HOST,
    dialect: 'postgres',
    timezone: 'Africa/Lagos',
    logging: process.env.NODE_ENV === 'test' ? false : consola.log,
  },
};


Connections.defaultConnection = Connections[process.env.DB_CONNECTION];

// Use test DB when running unit tests
if (process.env.NODE_ENV === 'test') {
  Connections.defaultConnection = Connections.postgres_test;
  // as DBConnInterface & ElasticConnInterface;
}

module.exports = { Connections };
