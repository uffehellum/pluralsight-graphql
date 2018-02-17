const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')
const pgdb = require('../../database/pgdb')
const NameType = require('../types/name')

const NameInputType = new GraphQLInputObjectType({
    name: 'NameInput',
    fields: {
        apiKey: {type: new GraphQLNonNull(GraphQLString)},
        contestCode: {type: new GraphQLNonNull(GraphQLString)},
        label: {type: new GraphQLNonNull(GraphQLString)},
        description:{type: GraphQLString},
    }
})

module.exports ={
    name: 'AddNameMutation',
    type: NameType,
    args: {
        input: {type: new GraphQLNonNull(NameInputType)}
    },
    resolve(obj, {input}, {pgPool}) {
        return pgdb(pgPool).addNewName(input)
    }
}
