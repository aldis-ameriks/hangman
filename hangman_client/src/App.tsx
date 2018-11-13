import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { inject, observer } from 'mobx-react';
import { ReactComponent as Gallows } from './components/gallows.svg';
import NavigationBar from './components/NavigationBar';
import GameInput from './hangman/GameInput';
import GameState from './hangman/GameState';
import HangmanStore, { HangmanGameState } from './hangman/HangmanStore';
import NewGameButton from './hangman/NewGameButton';

const styles = (theme: any) => ({
  layout: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 4,
    maxWidth: 1000,
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    margin: `${theme.spacing.unit * 2}px`,
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 4,
    display: 'block',
  },
});

type HangmanGameProps = HangmanGameState & { classes: any };

const HangmanGame: React.FunctionComponent<HangmanGameProps> = ({
  letters,
  notification,
  turnsLeft,
  used,
  isGameOver,
  classes,
  startNewGame,
  makeMove,
}) => (
  <Grid container={true} spacing={40}>
    <Grid item={true} sm={6} xs={12}>
      <Gallows />
    </Grid>
    <Grid item={true} sm={6} xs={12}>
      <GameState letters={letters} notification={notification} turnsLeft={turnsLeft} />
      {isGameOver ? (
        <NewGameButton classes={classes} startNewGame={startNewGame} />
      ) : (
        <GameInput makeMove={makeMove} used={used} />
      )}
    </Grid>
  </Grid>
);

HangmanGame.defaultProps = {
  notification: undefined,
};

@inject('hangmanStore')
@observer
class App extends Component<{ classes: any; hangmanStore: HangmanStore }> {
  public componentDidMount() {
    this.props.hangmanStore.initializeGame();
  }

  public render() {
    const { classes, hangmanStore } = this.props;
    if (hangmanStore.gameState === 'loading') {
      return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
    }

    const {
      notification,
      makeMove,
      startNewGame,
      isGameOver,
      letters,
      used,
      turnsLeft,
    } = hangmanStore;
    return (
      <>
        <NavigationBar />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <HangmanGame
              classes={classes}
              letters={letters}
              isGameOver={isGameOver}
              makeMove={makeMove}
              notification={notification}
              startNewGame={startNewGame}
              turnsLeft={turnsLeft}
              used={used}
            />
          </Paper>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(App);
