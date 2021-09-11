
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import i18next from 'i18next';
export default function Header({languaje}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    }
  }));

  const classes = useStyles();
  return (
      <AppBar position="static" style={{background:"#25272A"}}>
       <Toolbar>
       <Typography variant="h5" className={classes.title} onClick={e => Router.push('/[lang]/', `/${languaje}/`)}>
       {i18next.t('home')}
          </Typography>
          <Button color="inherit" onClick={e => Router.push('/[lang]/restaurantes/', `/${languaje}/restaurantes/`)}> {i18next.t('restaurantnav')}</Button>

          <Button color="inherit" onClick={e => Router.push('/[lang]/foodtype/', `/${languaje}/foodtype/`)}>
          {i18next.t('foodtypenav')}</Button>
  
      </Toolbar>
      </AppBar>
  );
}
