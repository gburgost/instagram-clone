import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import "dotenv/config";

import cors from 'cors'; //necesita cors para funcionar con graphql

import models from './models';
import auth from './auth';

//mezclar todos los archivos ded carpetas de types y resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors({
  origin:["http://localhost:3001"]
}));
app.use(auth.checkHeaders)

//bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
  console.log("User ID", req.user);
  return {
    schema,
    context: {
      models,
      SECRET: process.env.SECRET,
      user: req.user
    }
  }
}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want graphiql enabled

//Conexion BD
mongoose.connect('mongodb://localhost:27017/instagram-clone', { useNewUrlParser: true }).then(
  () => {
    console.log('Conectado a Mongo!!');
    app.listen(process.env.PORT, () => {
      console.log('Running server...');
    });
  }
)
