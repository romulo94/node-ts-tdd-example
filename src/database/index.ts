import path from 'path'

import { Sequelize } from 'sequelize-typescript'

import dbConfig from '../config/database'

const { host, username, password, database, logging, storage } = dbConfig

const models = path.resolve(__dirname, '..', 'app', 'models')

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT === 'sqlite' ? 'sqlite' : 'postgres',
  host,
  username,
  password,
  logging,
  database,
  storage,
  models: [models]
})

export default sequelize
