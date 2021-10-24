const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema');

const { 
  getRestaurantCompRanges, 
  getRestaurantSalaryRanges, 
  getRestaurantBonusRanges 
} = require('./resolvers');


const root = {
  getRestaurantCompRanges: getRestaurantCompRanges,
  getRestaurantSalaryRanges: getRestaurantSalaryRanges,
  getRestaurantBonusRanges: getRestaurantBonusRanges,
};

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000

app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);