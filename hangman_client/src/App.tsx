import * as PIXI from 'pixi.js';
import React, { Component } from 'react';

import { Graphics, Sprite, Stage, Text } from '@inlet/react-pixi';
import HangmanProvider, { GameState } from './hangman/HangmanProvider';

const noop = () => {
  console.log('noop');
};
const centerAnchorPoint = new PIXI.ObservablePoint(noop, null, 0.5, 0.5);

const canvasWidth = 1280;
const canvasHeight = 720;

type State = {
  newGameHovered: boolean;
};

class Game extends Component<GameState, State> {
  constructor(props: GameState) {
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
        content = (
          <>
            <Text
              x={canvasWidth / 2}
              y={canvasHeight / 2 + 150}
              anchor={centerAnchorPoint}
              text={`Game status: ${status}`}
            />
            <Text x={canvasWidth / 2} y={canvasHeight / 2 + 180} anchor={centerAnchorPoint} text={letters} />
            <Text
              x={canvasWidth / 2}
              y={canvasHeight / 2 + 220}
              anchor={centerAnchorPoint}
              text={`Turns left: ${turnsLeft}`}
            />
            <Sprite
              image={`sprites/sprite_2.png`}
              x={canvasWidth / 2}
              y={canvasHeight / 2 - 100}
              scale={new PIXI.Point(1, 1)}
              anchor={centerAnchorPoint}
            />
            <NewGameButton onClick={startNewGame} />
          </>
        );
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
        </Stage>
      </div>
    );
  }
}

type NewGameButtonProps = { onClick: () => void };
type NewGameButtonState = { newGameHovered: boolean };

class NewGameButton extends React.Component<NewGameButtonProps, NewGameButtonState> {
  constructor(props: NewGameButtonProps) {
    super(props);
    this.state = { newGameHovered: false };
  }

  public render() {
    const newGameButtonImg = this.state.newGameHovered ? 'sprite_1' : 'sprite_0';

    return (
      <>
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
