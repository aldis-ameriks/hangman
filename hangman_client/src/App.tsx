import * as PIXI from 'pixi.js';
import React from 'react';

import { Stage, Text } from '@inlet/react-pixi';
import HangmanProvider, { GameState } from './hangman/HangmanProvider';

const textStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440,
});

const Game: React.FunctionComponent<GameState> = ({ letters, turnsLeft, used, status, startNewGame, makeMove }) => {
  let content;
  switch (status) {
    case 'initializing':
      content = (
        <>
          <Text x={30} y={90} text="Hangman" style={textStyle} />
          <Text x={30} y={280} text="Start new game" style={textStyle} />
        </>
      );
  }

  return <Stage options={{ backgroundColor: 0x1099bb }}>{content}</Stage>;
};

const App = () => <HangmanProvider render={gameState => <Game {...gameState} />} />;

export default App;
