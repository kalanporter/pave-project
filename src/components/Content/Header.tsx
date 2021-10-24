import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    height: 80,
    width: '100%',
    position: 'fixed',
    zIndex: 110,
    backgroundColor: theme.palette.white.main,
  },
  buttonContainer: {
    marginLeft: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
    color: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.primary.main,
  },
  logo: {
    height: 35,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 20,
  },
}));

export const Header = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.header}>
      <Grid className={classes.buttonContainer}>
        <IconButton onClick={() => {}}>
          <MenuIcon className={classes.icon} />
        </IconButton>
      </Grid>

      <img src={logo} className={classes.logo} alt="logo" />
    </Grid>
  );
};
