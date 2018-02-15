const{
    GraphQLEnumType
} = require('graphql')

module.exports = new GraphQLEnumType({
        // varchar(10) not null default 'draft'
        // check (status in ('draft', 'published', 'archived')),
    name: 'ContestStatusType',
    values: {
        DRAFT: {value: 'draft'},
        PUBLISHED: {value:'published'},
        ARCHIVED: {value:'archived'},
    }
})