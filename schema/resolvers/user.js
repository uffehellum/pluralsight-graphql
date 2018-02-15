const pgdb = require('../../database/pgdb')
const humps = require('humps')

module.exports =  pgPool => { return {
        resolve(key) {
            return pgdb(pgPool).getUserByApiKey(key).then(row => {
                return humps.camelizeKeys(row)
            })
        }
    }
}
