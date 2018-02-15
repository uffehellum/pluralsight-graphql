const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

module.exports = new GraphQLObjectType({
    name: 'FizzBuzzType',
    fields: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
    }
})
