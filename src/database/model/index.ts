/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import consola from 'consola';
import { createNamespace } from 'cls-hooked';
import { Sequelize } from 'sequelize';
import { Connections } from '../../config/database';
import { constants } from '../../config/constants';

dotenv.config();

const basename = path.basename(__filename);
const namespace = createNamespace(constants.NameSpaces.Cls);
const defaultConnection = Connections.defaultConnection;

Sequelize.useCLS(namespace);

const sequelize: Sequelize = new Sequelize(
  defaultConnection.database,
  defaultConnection.username,
  defaultConnection.password,
  defaultConnection.options,
);

const isDatabaseAuthorized = authSequelize();

if (!isDatabaseAuthorized) {
  throw new Error('Database Authorization error');
}

const models = fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js')
    );
  })
  .reduce((total: any, filename: string) => {
    const model = require(path.join(__dirname, filename));
    if (model.default) {
      total[model.default.name] = model.default.defineModelAttrs(sequelize);
    } else {
      total[model.name] = model.defineModelAttrs(sequelize);
    }
    return total;
  }, {});

Object.keys(models).forEach((modelName) => {
  if (models[modelName].defineAssociation) {
    models[modelName].defineAssociation(models);
  }
});

async function authSequelize() {
  try {
    await sequelize.authenticate();
    consola.success(
      'Connection to database has been established successfully.',
    );
    return true;
  } catch (error) {
    consola.error('Unable to connect to database', error);
    return false;
  }
}

export { models, sequelize };
