const expect = require('chai').expect

describe('mdb', () => {
    const { MongoClient, Logger } = require('mongodb')
    const nodeEnv = 'development'
    const mConfig = require('../config/mongo')[nodeEnv]
    // Logger.setLevel('debug')
    // Logger.filter('class', ['Server'])

    function createMongoPromise(connectionUrl) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(connectionUrl, function (err, mPool) {
                if (err) { reject(err); }
                resolve(mPool);
            });
        });
    }
    
    describe('getUsersByIds', () => {
        createMongoPromise(mConfig.url).then(mPool => {
            const mdb = require('../database/mdb')(mPool)
                it('should know keys 1 and 2', () => {
                    mdb.getUsersByIds([1, 2]).then((res, err) => {
                        return expect(res.length).to.be.equal(2)
                })
            })
        })
    })

})

