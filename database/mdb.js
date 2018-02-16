const _ = require('lodash')


module.exports = mPool => {
    function orderBySingle(rows, ids, field) {
        const h = _.groupBy(rows, field)
        return ids.map(id => {
            const a = h[id]
            if (a) return a[0]
            return {}
        })
    }

    return {
        getUsersByIds(userids) {
            console.log('mongo', userids)
            return mPool.collection('users')
                .find({userId: {$in: userids}})
                .toArray()
                .then( rows => {
                    console.log(rows)
                    return orderBySingle(rows, userids, 'userId')
                })
        }
    }
}
