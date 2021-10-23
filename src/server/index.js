const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const gql = require('graphql-tag');
const csvparser = require('csv-parser');
const graphqlHTTP = require('express-graphql');
const { buildASTSchema } = require('graphql');


const schema = buildASTSchema(gql`
  type Query {
    getRestaurantSalaryRanges: [RestaurantSalaryRanges!]!
  }

  enum EmploymentType {
    fullTime
    contractor
  }

  enum GenderType {
    Female
    Male
    Other
  }

  type SalaryRange {
    p10: Float!
    p25: Float!
    p50: Float!
    p75: Float!
    p90: Float!
  }

  type EmploymentTypeCompRange {
    employmentType: EmploymentType!
    range: SalaryRange!
  }

  type GenderCompRange {
    gender: GenderType!
    range: SalaryRange!
  }

  type LevelCompRange {
    level: Int!
    range: SalaryRange!
  }

  type DepartmentCompRange {
    department: String!
    range: SalaryRange!
  }

  type LocationCompRange {
    city: String!
    country: String!
    range: SalaryRange!
  }

  type RestaurantSalaryRanges {
    name: String
    employmentTypeCompRange: [EmploymentTypeCompRange!]!
    departmentCompRange: [DepartmentCompRange!]!
    levelCompRange: [LevelCompRange!]!
    genderCompRange: [GenderCompRange!]!
  }
`);

const asc = arr => arr.sort((a, b) => a - b);

const getPercentile = (arr, percentile) => {
  const sorted = asc(arr);
    const pos = (sorted.length - 1) * percentile;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
}

const fishHookDataFetcher = new Promise((resolve, reject) => {
  const results = [];
    fs.createReadStream(path.join(__dirname, './data/hookfish.csv'))
    .pipe(csvparser())
    .on('data', (data) => results.push(data))
    .on('end', resolve(results));
})

const gamineDataFetcher = new Promise((resolve, reject) => {
  const results = [];
    fs.createReadStream(path.join(__dirname, './data/gamine.csv'))
    .pipe(csvparser())
    .on('data', (data) => results.push(data))
    .on('end', resolve(results));
})

const getTotalCompRanges = (data) => {
  const totalComps = data.map(({ salary, bonus }) => parseInt(salary) + parseInt(bonus));

  return {
    p10: getPercentile(totalComps, 0.10),
    p25: getPercentile(totalComps, 0.25),
    p50: getPercentile(totalComps, 0.50),
    p75: getPercentile(totalComps, 0.75),
    p90: getPercentile(totalComps, 0.90),
  }
}

const getEmploymentTypeCompRange = (data) => {
  const contractors = data.filter(({ employmentType }) => employmentType === 'contractor');
  const fulltimeEmployees = data.filter(({ employmentType }) => employmentType === 'fullTime');

  return [
    { employmentType: 'contractor', range: getTotalCompRanges(contractors) }, 
    { employmentType: 'fullTime', range: getTotalCompRanges(fulltimeEmployees) }
  ]
}

const getGenderCompRange = (data) => {
  const male = data.filter(({ gender }) => gender === 'Male');
  const female = data.filter(({ gender }) => gender === 'Female');

  return [
    { gender: 'Male', range: getTotalCompRanges(male) }, 
    { gender: 'Female', range: getTotalCompRanges(female) }
  ]
}


const root = {
  getRestaurantSalaryRanges: async () => {
    const fishHookData = await fishHookDataFetcher
    const gamineData = await gamineDataFetcher

    return [
      { 
        name: 'Hookfish', 
        genderCompRange: getGenderCompRange(fishHookData),
        employmentTypeCompRange: getEmploymentTypeCompRange(fishHookData) 
      }, 
      { 
        name: 'Gamine', 
        genderCompRange: getGenderCompRange(gamineData),
        employmentTypeCompRange: getEmploymentTypeCompRange(gamineData) 
      }
    ]
  }
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