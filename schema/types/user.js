const {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: () => {
        const ContestType = require('./contest')
        return {
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: new GraphQLNonNull(GraphQLString) },
            createdAt: { type: GraphQLString },
            contests: {
                type: new GraphQLList(ContestType),
                resolve(obj, args, { loaders }) {
                    return loaders.contestsForUserIds.load(obj.id)
                },
            },
            contestsCount: {
                type: GraphQLInt,
                resolve(parent, args, { loaders }, { fieldName }) {
                    return loaders.userCountsByIds.load(parent.id)
                        .then(res => res[fieldName])
                }
            },
            namesCount: {
                type: GraphQLInt,
                resolve(parent, args, { loaders }, { fieldName }) {
                    return loaders.userCountsByIds.load(parent.id)
                        .then(res => res[fieldName])
                }
            },
            votesCount: {
                type: GraphQLInt,
                resolve(parent, args, { loaders }, { fieldName }) {
                    return loaders.userCountsByIds.load(parent.id)
                        .then(res => res[fieldName])
                }
            },
        }
    }
})

