import React from 'react';
import { HangmanNotification } from './HangmanStore';
import Typewriter from './Typewriter';

type Props = {
  notification?: HangmanNotification;
  turnsLeft: number;
  letters: string;
};

const GameState: React.FunctionComponent<Props> = ({ notification, turnsLeft, letters }) => (
  <>
    {notification && (
      <div className={`alert alert-${notification.type}`}>
        <Typewriter text={notification.message} interval={50} render={text => text} />
      </div>
    )}
    <p>Turns left: {turnsLeft}</p>
    <p>Letters: {letters}</p>
  </>
);

export default GameState;
