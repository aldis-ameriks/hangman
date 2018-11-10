import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { ReactComponent as Gallows } from './components/gallows.svg';
import HangmanProvider from './hangman/HangmanProvider';
import GameState from './hangman/GameState';
import GameInput from './hangman/GameInput';
import NewGameButton from './hangman/NewGameButton';

const styles = theme => ({
  layout: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 4,
    maxWidth: 1000
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    margin: `${theme.spacing.unit * 2}px`
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    display: 'block'
  }
});

const App = ({ classes }) => (
  <main className={classes.layout}>
    <Paper className={classes.paper}>
      <HangmanProvider
        render={({ startNewGame, makeMove, turnsLeft, letters, used, notification, isLost }) => (
          <Grid container spacing={40}>
            <Grid item sm={6} xs={12}>
              <Gallows />
            </Grid>
            <Grid item sm={6} xs={12}>
              <GameState letters={letters} notification={notification} turnsLeft={turnsLeft} used={used} />
              {isLost ? (
                <NewGameButton classes={classes} startNewGame={startNewGame} />
              ) : (
                <GameInput makeMove={makeMove} classes={classes} />
              )}
            </Grid>
          </Grid>
        )}
      />
    </Paper>
  </main>
);

App.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(App);
