import React from 'react';
import posed from 'react-pose';
import GameInput from './GameInput';
import GameState from './GameState';
import { HangmanNotification } from './HangmanStore';
import NewGameButton from './NewGameButton';

const GameControlsAnimation = posed.div({
  enter: { x: 0, opacity: 1, delay: 300, transition: { duration: 300 } },
  exit: { x: 50, opacity: 0 },
});

type Props = {
  letters: string;
  notification: HangmanNotification;
  turnsLeft: number;
  isGameOver: boolean;
  startNewGame: () => void;
  makeMove: (guess: string) => void;
  used: string[];
};

const GameControls: React.FunctionComponent<Props> = ({
  letters,
  notification,
  turnsLeft,
  isGameOver,
  startNewGame,
  makeMove,
  used,
}) => (
  <GameControlsAnimation>
    <GameState letters={letters} notification={notification} turnsLeft={turnsLeft} />
    {isGameOver ? (
      <NewGameButton startNewGame={startNewGame} />
    ) : (
      <GameInput makeMove={makeMove} used={used} />
    )}
  </GameControlsAnimation>
);

export default GameControls;
