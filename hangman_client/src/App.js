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
import NavigationBar from './components/NavigationBar';

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

const HangmanGame = ({ letters, notification, turnsLeft, used, isGameOver, classes, startNewGame, makeMove }) => (
  <Grid container spacing={40}>
    <Grid item sm={6} xs={12}>
      <Gallows />
    </Grid>
    <Grid item sm={6} xs={12}>
      <GameState letters={letters} notification={notification} turnsLeft={turnsLeft} used={used} />
      {isGameOver ? (
        <NewGameButton classes={classes} startNewGame={startNewGame} />
      ) : (
        <GameInput makeMove={makeMove} classes={classes} />
      )}
    </Grid>
  </Grid>
);

HangmanGame.propTypes = {
  letters: PropTypes.string.isRequired,
  used: PropTypes.string.isRequired,
  turnsLeft: PropTypes.number.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  startNewGame: PropTypes.func.isRequired,
  makeMove: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  notification: PropTypes.shape({ type: PropTypes.string, message: PropTypes.string })
};

HangmanGame.defaultProps = {
  notification: null
};

const App = ({ classes }) => (
  <>
    <NavigationBar />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <HangmanProvider render={gameState => <HangmanGame classes={classes} {...gameState} />} />
      </Paper>
    </main>
  </>
);

App.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(App);
