const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const ContestStatusType = require('./contest-status')
const NameType = require('./name')
const pgdb = require('../../database/pgdb')

module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: { // code","title","description","status","created_by
        id: { type: GraphQLID },
        code: { type: GraphQLString },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: new GraphQLNonNull(ContestStatusType) }, 
        createdAt: { type: GraphQLString },
        names: {
            type: new GraphQLList(NameType),
            resolve(parent, args, {pgPool}) {
                return pgdb(pgPool).getNames(parent)                
            },
        },
    }
})
