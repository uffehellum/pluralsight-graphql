const humps = require('humps')
const _ = require('lodash')
const { slug } = require('../lib/util')

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
        getTotalVotesByNameIds(nameIds) {
            return pgPool.query(`
                select 
                    sum(case when up then 1 else 0 end) as up, 
                    sum(case when up then 0 else 1 end) as down, 
                    name_id 
                from votes 
                group by name_id
                having name_id = any($1)
            `, [nameIds]).then(res => {
                return orderedFor(res.rows, nameIds, 'nameId')
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

        addNewContest({apiKey, title, description}) {
            return pgPool.query(`
            insert into contests(code, title, description, created_by)
            values($1, $2, $3,
                (select id from users where api_key = $4))
            returning *
            `,
            [slug(title), title, description, apiKey]).then(res =>{
                return humps.camelizeKeys(res.rows[0])
            })
        },

        addNewName({apiKey, contestCode, label, description}) {
            console.log('addNewName', apiKey, contestCode, label, description)
            return pgPool.query(`
            insert into names(contest_id, label, normalized_label, description, created_by)
            values(
                (select id from contests where code = $1),
                $2, $3, $4,
                (select id from users where api_key = $5))
            returning *
            `,
            [contestCode, label, slug(label), description, apiKey]).then(res =>{
                return humps.camelizeKeys(res.rows[0])
            })
        }

    }
}