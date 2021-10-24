const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const schema = buildASTSchema(gql`
  type Query {
    getRestaurantSalaryRanges: [RestaurantRange!]!
    getRestaurantBonusRanges: [RestaurantRange!]!
    getRestaurantCompRanges: [RestaurantRange!]!
  }

  enum Department {
    Management
    Kitchen
    Operations
    FrontOfHouse
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

  type Range {
    p10: Float!
    p25: Float!
    p50: Float!
    p75: Float!
    p90: Float!
  }

  type EmploymentTypeRange {
    employmentType: EmploymentType!
    range: Range!
  }

  type GenderRange {
    gender: GenderType!
    range: Range!
  }

  type LevelRange {
    level: Int!
    range: Range!
  }

  type DepartmentRange {
    department: Department!
    range: Range!
  }

  type RestaurantRange {
    name: String
    range: Range!
    employmentTypeRange: [EmploymentTypeRange!]!
    genderRange: [GenderRange!]!
    departmentCompRange: [DepartmentRange!]!
    levelCompRange: [LevelRange!]!
  }
`);

exports.schema = schema;