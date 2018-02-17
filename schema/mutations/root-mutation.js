const { GraphQLObjectType } = require('graphql')
const AddContestMutation = require('./add-contest')
const AddNameMutation = require('./add-name')

module.exports = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        AddContest: AddContestMutation,
        AddName: AddNameMutation,
    })
})
