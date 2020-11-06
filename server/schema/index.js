const { gql } = require("apollo-server");
const merge = require("lodash/merge");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  enum Permission {
    CREATE_WHITELIST_ITEM
    UPDATE_WHITELIST_ITEM
    DELETE_WHITELIST_ITEM
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    permissions: [Permission!]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }

  input UserInput {
    firstName: String!
    lastName: String!
    permissions: [Permission!]!
  }

  type Mutation {
    createUser(input: UserInput!): User!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  ...merge(require("./resolvers/users")),
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

module.exports = {
  typeDefs,
  resolvers,
};
