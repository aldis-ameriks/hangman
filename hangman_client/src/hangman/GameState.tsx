import React from 'react';
import Notification from '../components/Notification';
import { HangmanNotification } from './HangmanStore';

type Props = {
  notification?: HangmanNotification;
  turnsLeft: number;
  letters: string;
};

const GameState: React.FunctionComponent<Props> = ({ notification, turnsLeft, letters }) => (
  <>
    {notification && (
      <Notification variant={notification.type}>{notification.message}</Notification>
    )}
    <p>Turns left: {turnsLeft}</p>
    <p>Letters: {letters}</p>
  </>
);

export default GameState;
