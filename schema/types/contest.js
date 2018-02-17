const {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: () => {
        const ContestStatusType = require('./contest-status')
        const NameType = require('./name')
        const UserType = require('./user')

        return {
            // code","title","description","status","created_by
            id: { type: GraphQLID },
            code: { type: GraphQLString },
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            status: { type: new GraphQLNonNull(ContestStatusType) }, 
            createdAt: { type: GraphQLString },
            createdBy: { 
                type: new GraphQLNonNull(UserType),
                resolve(parent, args, {loaders}) {
                    return loaders.usersByIds.load(parent.createdBy)
                }
            },
            names: {
                type: new GraphQLList(NameType),
                resolve(parent, args, {loaders}) {
                    return loaders.namesForContestIds.load(parent.id)                
                },
            },
        }
    }
})
