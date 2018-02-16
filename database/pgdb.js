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
function orderedForMany(rows, ids, field) {
    const data = humps.camelizeKeys(rows)
    const h = _.groupBy(data, field)
    return ids.map(id => {
        const a = h[id]
        if (a) return a
        return []
    })
}

module.exports = pgPool => {
    return {
        getContestsForUserIds(userIds) {
            return pgPool.query(`
                select * 
                from contests 
                where created_by = any($1)
            `, [userIds]).then(res => {
                return orderedForMany(res.rows, userIds, 'createdBy')
            })
        },
        getNamesForContestIds(contestIds) {
            return pgPool.query(`
                select * 
                from names 
                where contest_id = any($1)
            `, [contestIds]).then(res => {
                return orderedForMany(res.rows, contestIds, 'contestId')
            })
        },
        getUsersByApiKeys(apiKeys) {
            return pgPool.query(`
                select * 
                from users 
                where api_key = any($1)
                `, [apiKeys])
                .then( res => { 
                    return orderedFor(res.rows, apiKeys, 'apiKey')
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