import gql from 'graphql-tag';

export const GET_COMP_RANGES = gql`
  query {
    getRestaurantCompRanges {
      name
      range {
        p10
        p25
        p50
        p75
        p90
      }
      genderRange {
        gender
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      employmentTypeRange {
        employmentType
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      departmentCompRange {
        department
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      levelCompRange {
        level
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
    }
    getRestaurantSalaryRanges {
      name
      range {
        p10
        p25
        p50
        p75
        p90
      }
      genderRange {
        gender
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      employmentTypeRange {
        employmentType
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
    }
    getRestaurantBonusRanges {
      name
      range {
        p10
        p25
        p50
        p75
        p90
      }
      genderRange {
        gender
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      employmentTypeRange {
        employmentType
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
    }
  }
`;
