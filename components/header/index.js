
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Header() {
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
       <Typography variant="h6" className={classes.title} onClick={() => { Router.push('/') }}>
            Home
          </Typography>
          <Button color="inherit" onClick={() => { Router.push('/restaurantes') }}>Edit</Button>

          <Button color="inherit" onClick={() => { Router.push('/foodtype') }}>Foodtype</Button>
  
      </Toolbar>
      </AppBar>
  );
}
