import * as PIXI from 'pixi.js';
import React, { Component } from 'react';

import { Sprite, Stage } from '@inlet/react-pixi';
import HangmanProvider, { GameState } from './hangman/HangmanProvider';

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
    const width = 800;
    const height = 600;
    const noop = () => {
      console.log('noop');
    };
    let content;
    switch (status) {
      case 'initializing':
        const newGameButtonImg = this.state.newGameHovered ? 'new_game_hover' : 'new_game';
        content = (
          <>
            <Sprite
              image={`sprites/${newGameButtonImg}.png`}
              x={width / 2}
              y={height / 2}
              interactive={true}
              buttonMode={true}
              scale={new PIXI.Point(0.5, 0.5)}
              anchor={new PIXI.ObservablePoint(noop, null, 0.5, 0.5)}
              pointerover={() => {
                this.setState({ newGameHovered: true });
              }}
              pointerout={() => {
                this.setState({ newGameHovered: false });
              }}
              pointerdown={() => {
                console.log('pointer down');
              }}
              hitArea={new PIXI.Rectangle(-292, -44, 292 * 2, 44 * 2)}
            />
          </>
        );
    }
    return (
      <Stage options={{ backgroundColor: 0x1099bb }} width={width} height={height}>
        {content}
      </Stage>
    );
  }
}

const App = () => <HangmanProvider render={gameState => <Game {...gameState} />} />;

export default App;
