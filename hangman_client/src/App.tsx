import * as PIXI from 'pixi.js';
import React, { Component } from 'react';

import { Graphics, Sprite, Stage, Text } from '@inlet/react-pixi';
import HangmanProvider, { HangmanGame } from './hangman/HangmanProvider';

const noop = () => {
  console.log('noop');
};
const centerAnchorPoint = new PIXI.ObservablePoint(noop, null, 0.5, 0.5);

const canvasWidth = 1280;
const canvasHeight = 720;

type State = {
  newGameHovered: boolean;
};

class Game extends Component<HangmanGame, State> {
  constructor(props: HangmanGame) {
    super(props);
    this.state = {
      newGameHovered: false,
    };
  }

  public render() {
    const { letters, turnsLeft, used, status, startNewGame, makeMove } = this.props;

    let content;
    switch (status) {
      case 'initializing':
      case 'started':
        content = <Landing onClick={startNewGame} />;
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '80vh', justifyContent: 'center' }}>
        <Stage options={{ backgroundColor: 0x969696, antialias: true }} width={canvasWidth} height={canvasHeight}>
          <Graphics
            draw={g => {
              g.lineStyle(25, 0x0, 1);
              g.drawRect(0, 0, canvasWidth, canvasHeight);
            }}
          />

          {content}
          {this.renderState()}
        </Stage>
      </div>
    );
  }

  private renderState() {
    const { letters, turnsLeft, status } = this.props;
    if (this.props.status === 'initializing') {
      return null;
    }
    return (
      <>
        <Text
          x={canvasWidth / 2}
          y={canvasHeight / 2 + 150}
          anchor={centerAnchorPoint}
          text={`Game status: ${status}`}
        />
        <Text x={canvasWidth / 2} y={canvasHeight / 2 + 180} anchor={centerAnchorPoint} text={letters.join(' ')} />
        <Text
          x={canvasWidth / 2}
          y={canvasHeight / 2 + 220}
          anchor={centerAnchorPoint}
          text={`Turns left: ${turnsLeft}`}
        />
      </>
    );
  }
}

type LandingProps = { onClick: () => void };
type LandingState = { newGameHovered: boolean };

class Landing extends React.Component<LandingProps, LandingState> {
  constructor(props: LandingProps) {
    super(props);
    this.state = { newGameHovered: false };
  }

  public render() {
    const newGameButtonImg = this.state.newGameHovered ? 'sprite_1' : 'sprite_0';

    return (
      <>
        <Sprite
          image={`sprites/sprite_2.png`}
          x={canvasWidth / 2}
          y={canvasHeight / 2 - 100}
          scale={new PIXI.Point(1, 1)}
          anchor={centerAnchorPoint}
        />
        <Sprite
          image={`sprites/${newGameButtonImg}.png`}
          x={canvasWidth / 2}
          y={canvasHeight / 2 + 50}
          interactive={true}
          buttonMode={true}
          scale={new PIXI.Point(0.5, 0.5)}
          anchor={centerAnchorPoint}
          pointerover={() => {
            this.setState({ newGameHovered: true });
          }}
          pointerout={() => {
            this.setState({ newGameHovered: false });
          }}
          pointerdown={() => {
            this.props.onClick();
          }}
          hitArea={new PIXI.Rectangle(-292, -44, 292 * 2, 44 * 2)}
        />
      </>
    );
  }
}

const App = () => <HangmanProvider render={gameState => <Game {...gameState} />} />;

export default App;
