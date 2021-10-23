import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { ContractorChart } from '../Charts/ContractorChart';
import { FullTimeChart } from '../Charts/FullTimeChart';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: '100%',
    paddingTop: 80,
    backgroundColor: '#F6F8FA',
  },
  contentItem: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    width: '80%',
    backgroundColor: theme.palette.white.main,
  },
}));

export const GET_SALARY_RANGES = gql`
  query {
    getRestaurantSalaryRanges {
      name
      genderCompRange {
        gender
        range {
          p10
          p25
          p50
          p75
          p90
        }
      }
      employmentTypeCompRange {
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

export const Content = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.content}>
      <Query query={GET_SALARY_RANGES}>
        {({ loading, data }: { loading: boolean; data: any }) => {
          return !loading ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              className={classes.contentItem}
            >
              <ContractorChart data={data} />
              <FullTimeChart data={data} />
            </Grid>
          ) : null;
        }}
      </Query>
    </Grid>
  );
};
