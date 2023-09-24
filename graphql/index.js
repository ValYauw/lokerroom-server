require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 5001 },
  context: async ({ req, res }) => {
    const access_token = req.headers.access_token || null;
    return { access_token };
  },
})
  .then(result => {
    console.log(`Server ready at: ${result.url}`);
  })
  .catch(console.log);