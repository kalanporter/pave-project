import React from 'react';

import { Query } from 'react-apollo';
import { Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import { GetCompRange } from '../graphql/types';
import { GET_COMP_RANGES } from '../graphql/compRanges';
import {
  SalaryChart,
  BonusChart,
  GenderChart,
  LevelChart,
  FullTimeChart,
  ContractorChart,
  DepartmentChart,
} from '../Charts';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: '100%',
    paddingTop: 80,
    backgroundColor: theme.palette.primary.light,
  },
  contentItem: {
    width: '80%',
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.white.main,
  },
}));

export const Content = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.content}>
      <Query query={GET_COMP_RANGES}>
        {({ loading, data }: { loading: boolean; data: GetCompRange }) => {
          if (loading) return null;
          return (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              className={classes.contentItem}
            >
              <SalaryChart data={data} />
              <BonusChart data={data} />
              <FullTimeChart data={data} />
              <ContractorChart data={data} />
              <GenderChart data={data} />
              <DepartmentChart data={data} />
              <LevelChart data={data} />
            </Grid>
          );
        }}
      </Query>
    </Grid>
  );
};
