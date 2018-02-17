const app = require('express')()
const assert = require('assert')
const DataLoader = require('dataloader')
const graphqlHTTP = require('express-graphql')
const { MongoClient }  = require('mongodb')
const pg = require('pg')
const nodeEnv = require('./util').nodeEnv
const mConfig = require('../config/mongo')[nodeEnv]
const ncSchema = require('../schema')
const pgConfig = require('../config/pg')[nodeEnv]
const pgPool = new pg.Pool(pgConfig)
const pgdb = require('../database/pgdb')(pgPool)
const PORT = process.env.PORT || 3000

MongoClient.connect(mConfig.url, (err, mPool) => {
    assert.equal(err, null)

    const mdb = require('../database/mdb')(mPool)

    app.use('/graphql', (req, res) => {
        const loaders = {
            activitiesForUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
            usersByIds: new DataLoader(pgdb.getUsersByIds),
            usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
            contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
            namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
            totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
            userCountsByIds: new DataLoader(mdb.getUsersByIds),
        }        
        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: {
                pgPool,
                mPool,
                loaders
            }
        })(req, res)
    })
    
    app.listen(PORT, () => {
        console.log(`Serveren bruger environment ${nodeEnv}`)
        console.log(`Serveren bruger postgres ${pgConfig.user}@${pgConfig.database}`)
        console.log(`Serveren bruger mongo ${mConfig.url}`)
        console.log(`Serveren lytter på port ${PORT}`)
    })
})

