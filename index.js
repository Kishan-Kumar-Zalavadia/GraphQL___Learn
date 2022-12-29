const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  """
    An object that describes the characteristics of a ski day
  """

  type SkiDay {
    "A ski day's unique identifier"
    id: ID!
    "A date that ski day occurred"
    date: Date!
    "A location where a ski day occurred"
    mountain: String!
    "The shape that the snow was in when this ski day happened"
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