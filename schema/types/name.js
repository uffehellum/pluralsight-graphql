const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'NameType',
    fields: () => {
        const UserType = require('./user')
        return {
            id: { type: GraphQLID },
            label: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            createdBy: {
                type: UserType,
                resolve(parent, args, { loaders }) {
                    //console.log(parent)
                    // return pgdb(pgPool).getUserById(parent.createdBy)
                    return loaders.usersByIds.load(parent.createdBy)
                }
            },
        }
    }
})