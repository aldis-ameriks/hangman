import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import GameInput from './hangman/GameInput';
import GameState from './hangman/GameState';
import HangmanStore from './hangman/HangmanStore';
import NewGameButton from './hangman/NewGameButton';
import Typewriter from './hangman/Typewriter';

@inject('hangmanStore')
@observer
class App extends Component<{ hangmanStore: HangmanStore }> {
  public componentDidMount() {
    this.props.hangmanStore.initializeGame();
  }

  public componentDidUpdate() {
    this.renderGallows();
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
          <Typewriter text="Welcome to Hangman" interval={100} render={text => <h1>{text}</h1>} />
        </div>
        <hr />
        <div className="container game-container">
          <div className="row">
            <div className="span6">
              <canvas id="gallows" height="504px" width="400px">
                Canvas is not supported ;-(
              </canvas>
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

  private renderGallows() {
    const { turnsLeft } = this.props.hangmanStore;
    // @ts-ignore
    const canvas = document.getElementById('gallows');
    // @ts-ignore
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;

    switch (turnsLeft) {
      case 7: {
        ctx.beginPath();
        ctx.clearRect(0, 0, 400, 504);
        ctx.stroke();

        ctx.moveTo(350, 450);
        ctx.lineTo(50, 450);
        ctx.lineTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.stroke();
        break;
      }
      case 6: {
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(200, 100);
        ctx.stroke();
        break;
      }
      case 5: {
        ctx.beginPath();
        ctx.moveTo(200, 100);
        ctx.arc(200, 150, 30, 1.5 * Math.PI, -0.5 * Math.PI, true);
        ctx.stroke();
        break;
      }
      case 4: {
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(200, 300);
        ctx.stroke();
        break;
      }
      case 3: {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(150, 250);
        ctx.stroke();
        break;
      }
      case 2: {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(250, 250);
        ctx.stroke();
        break;
      }
      case 1: {
        ctx.beginPath();
        ctx.moveTo(200, 300);
        ctx.lineTo(150, 350);
        ctx.stroke();
        break;
      }
      case 0: {
        ctx.beginPath();
        ctx.moveTo(200, 300);
        ctx.lineTo(250, 350);

        ctx.moveTo(190, 140);
        ctx.lineTo(195, 145);
        ctx.moveTo(195, 140);
        ctx.lineTo(190, 145);

        ctx.moveTo(210, 140);
        ctx.lineTo(215, 145);
        ctx.moveTo(215, 140);
        ctx.lineTo(210, 145);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(200, 170, 14, -0.15 * Math.PI, -0.85 * Math.PI, true);
        ctx.stroke();

        break;
      }
    }
  }
}

export default App;
