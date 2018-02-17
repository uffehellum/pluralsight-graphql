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
        const ActivityType = require('./activity')

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
            activities: {
                type: new GraphQLList(ActivityType),
                resolve(obj, args, { loaders }){
                    console.log('resolve activities', obj)
                    return loaders.activitiesForUserIds.load(obj.id)
                }
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

