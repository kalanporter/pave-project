import React from 'react';

import { Content } from '../Content';

import Grid from '@material-ui/core/Grid';
import { theme } from '../../utils/theme';
import { makeStyles } from '@material-ui/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Header } from '../Content/Header';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

export const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <Grid container direction="row" className={classes.container}>
        <Content />
      </Grid>
    </MuiThemeProvider>
  );
};
