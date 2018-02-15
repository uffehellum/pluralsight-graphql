module.exports = mPool => {
    return {
        getCounts(userid, countsField) {
            // console.log(userid, countsField)
            return mPool.collection('users')
                .findOne({userId: userid})
                .then(doc => doc[countsField])
        }
    }
}
