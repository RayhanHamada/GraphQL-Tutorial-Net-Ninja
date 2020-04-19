import express from 'express';
import { graphql } from 'graphql';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import cors from "cors";

import schema from './schema/schema';

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/gql-hmd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => console.log(`connected to database !`));

app.use(
  '/graphql',
  graphqlHttp({
    schema,
    graphiql: true,
  })
);

app.listen(4001, () => console.log(`listening on port 4001`));
