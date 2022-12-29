const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`

  scalar Date

  type SkiDay {
    id: ID!
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): SkiDay!
  }
`;

const server = new ApolloServer({
  typeDefs,
  // resolvers
  mocks: true,
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
