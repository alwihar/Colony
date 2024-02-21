import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from 'mongoose';

import express from 'express';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';

const { json } = pkg;
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();
const httpServer = http.createServer(app);

mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
