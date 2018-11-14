import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import { ReactComponent as Gallows } from './components/gallows.svg';
import GameInput from './hangman/GameInput';
import GameState from './hangman/GameState';
import HangmanStore from './hangman/HangmanStore';
import NewGameButton from './hangman/NewGameButton';

@inject('hangmanStore')
@observer
class App extends Component<{ hangmanStore: HangmanStore }> {
  public componentDidMount() {
    this.props.hangmanStore.initializeGame();
  }

  public render() {
    const { hangmanStore } = this.props;
    if (hangmanStore.gameState === 'loading') {
      return null;
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
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <a className="brand" href="#">
                Hangman
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Welcome to the Hangman game</h1>
        </div>
        <hr />
        <div className="container game-container">
          <div className="row">
            <div className="span6">
              <Gallows />
            </div>
            <div className="span6">
              <GameState letters={letters} notification={notification} turnsLeft={turnsLeft} />
              {isGameOver ? (
                <NewGameButton startNewGame={startNewGame} />
              ) : (
                <GameInput makeMove={makeMove} used={used} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
