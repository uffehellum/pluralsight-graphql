const humps = require('humps')
const _ = require('lodash')

function orderedFor(rows, ids, field) {
    const data = humps.camelizeKeys(rows)
    const h = _.groupBy(data, field)
    return ids.map(id => {
        const a = h[id]
        if (a) return a[0]
        return {}
    })
}

module.exports = pgPool => {
    return {
        getContests(user) {
            // console.log(`getContests(${user})`)
            return pgPool.query(`
                select * 
                from contests 
                where created_by = $1
            `, [user.id]).then(res => {
                // console.log(res)
                return humps.camelizeKeys(res.rows)
            })
        },
        getNames(user) {
            // console.log(`getContests(${user})`)
            return pgPool.query(`
                select * 
                from names 
                where created_by = $1
            `, [user.id]).then(res => {
                // console.log(res)
                return humps.camelizeKeys(res.rows)
            })
        },
        getUserByApiKey(apiKey) {
            return pgPool.query(`
                select * 
                from users 
                where api_key = $1
            `, [apiKey]).then( res => { 
                return res.rows[0]
            })
        },
        getUsersByIds(ids) {
            return pgPool.query(`
                select * 
                from users 
                where id = any($1)
            `, [ids]).then( res => { 
                return orderedFor(res.rows, ids, 'id')
            })
        },
    }
}