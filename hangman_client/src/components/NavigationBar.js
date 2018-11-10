import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavigationBar = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Hangyman
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
