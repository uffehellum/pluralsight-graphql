const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const ContestType = require('./contest')
const mdb = require('../../database/mdb')

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: {type: GraphQLID},
        firstName: {type: GraphQLString },
        lastName: {type: GraphQLString },
        email: {type:new GraphQLNonNull(GraphQLString)},
        createdAt: {type: GraphQLString },
        contests: { 
            type: new GraphQLList (ContestType), 
            resolve(obj, args, {loaders}) {
                return loaders.contestsForUserIds.load(obj.id)
            },
        },
        contestsCount: {
            type: GraphQLInt,
            resolve(parent, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(parent.id, fieldName)
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(parent, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(parent.id, fieldName)
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(parent, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(parent.id, fieldName)
            }
        },
    }
})

