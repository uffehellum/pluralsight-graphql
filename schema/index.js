const { GraphQLSchema } = require('graphql')
const RootMutationType = require('./mutations/root-mutation')
const RootQueryType = require('./types/root-query')

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
    //schema:
})
