const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const pgdb = require('../database/pgdb')
const fizzbuzzdb = require('../database/fizzbuzz')
const UserType = require('./types/user')
const FizzBuzzType = require('./types/fizzbuzz')

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        'fizzbuzz': {
            args: {
                number : {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'Seed value to FizzBuzz'
                }},
            description: 'Game of Fizz Buzz',
            type: FizzBuzzType,
            resolve: (parent, {number}, {}) => {
                return fizzbuzzdb.resolve(number)
            }
        },
        'user':{
            args: {
                key: { 
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'API key',
                },
            },
            type: UserType,
            description: 'Use record from API key',
            resolve: (objparent, {key}, {pgPool}) => { 
                return pgdb(pgPool).getUserByApiKey(key)
            }
        },
        'hello': {
            type: GraphQLString,
            description: 'Greet the *wide* world',
            resolve: () => 'world',
        },
        'hallo': {
            description: 'Hilsen til *hele* verden',
            type: GraphQLString,
            resolve: () => 'verden',
        },
    },
})

ncSchema = new GraphQLSchema({
    query: RootQueryType
    //schema:
})

module.exports = ncSchema

