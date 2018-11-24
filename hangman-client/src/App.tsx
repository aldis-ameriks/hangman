import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import posed, { PoseGroup } from 'react-pose';
import Typewriter from './components/Typewriter';
import GameControls from './hangman/GameControls';
import HangmanCanvas from './hangman/HangmanCanvas';
import HangmanStore from './hangman/HangmanStore';
import Navbar from './hangman/Navbar';

const AnimatedContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

@inject('hangmanStore')
@observer
class App extends Component<{ hangmanStore: HangmanStore }> {
  public componentDidMount() {
    this.props.hangmanStore.initializeGame();
  }

  public render() {
    const { hangmanStore } = this.props;
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
      <PoseGroup>
        {hangmanStore.gameState !== 'loading' && (
          <AnimatedContainer key="main">
            <Navbar />
            <div className="container">
              <Typewriter
                text="Welcome to Hangman"
                interval={100}
                render={text => <h1>&nbsp;{text}</h1>}
              />
            </div>
            <hr />
            <div className="container game-container">
              <div className="row">
                <div className="span6">
                  <HangmanCanvas turnsLeft={turnsLeft} />
                </div>
                <div className="span6">
                  <GameControls
                    isGameOver={isGameOver}
                    letters={letters}
                    makeMove={makeMove}
                    notification={notification}
                    startNewGame={startNewGame}
                    turnsLeft={turnsLeft}
                    used={used}
                  />
                </div>
              </div>
            </div>
          </AnimatedContainer>
        )}
      </PoseGroup>
    );
  }
}

export default App;
