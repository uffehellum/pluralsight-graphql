const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const ContestType = require('./contest')

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
            resolve(parent, args, {loaders}, {fieldName}) {
                console.log(fieldName)
                return loaders.userCountsByIds.load(parent.id)
                .then(res => res[fieldName])
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(parent, args, {loaders}, {fieldName}) {
                console.log(fieldName)
                return loaders.userCountsByIds.load(parent.id)
                .then(res => res[fieldName])
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(parent, args, {loaders}, {fieldName}) {
                console.log(fieldName)
                return loaders.userCountsByIds.load(parent.id)
                .then(res => res[fieldName])
            }
        },
    }
})

