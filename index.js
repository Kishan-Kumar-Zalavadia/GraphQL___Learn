const { ApolloServer, gql, MockList } = require("apollo-server");

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

  type RemoveDayPayLoad{
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDayPayLoad!
  }

  type Subscription{
    newDay: SkiDay!
  }
`;

const mocks = {
  Date: () => "29/12/2022",
  String: () => "Thats a cool string",
//   Query: () => ({
//     allDays: () => new MockList(8)
//   })
};

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));