const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')
const fizzbuzzdb = require('../../database/fizzbuzz')
const UserType = require('./user')
const FizzBuzzType = require('./fizzbuzz')

module.exports = new GraphQLObjectType({
    name: 'RootQuery',
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
            resolve: (objparent, {key}, {loaders}) => { 
                return loaders.usersByApiKeys.load(key)
            }
        },
    },
})
