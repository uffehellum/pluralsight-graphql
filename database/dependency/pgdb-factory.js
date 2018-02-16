const pg = require('pg')
const nodeEnv = 'development'
const pgConfig = require('../../config/pg')[nodeEnv]
const pgPool = new pg.Pool(pgConfig)
const pgdb = require('../pgdb')(pgPool)

module.exports = pgdb