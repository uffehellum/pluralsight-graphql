const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const pgdb = require('../database/pgdb')
const UserType = require('./types/user')
const UserResolver = require('./resolvers/user')
const FizzBuzzType = require('./types/fizzbuzz')
const FizzBuzzResolver = require('./resolvers/fizzbuzz')

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
                return FizzBuzzResolver.resolve(number)
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
                return UserResolver(pgPool).resolve(key)
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

