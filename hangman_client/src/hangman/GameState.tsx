import React from 'react';
import Notification from '../components/Notification';
import { HangmanNotification } from './HangmanProvider';

type Props = {
  notification?: HangmanNotification;
  turnsLeft: number;
  letters: string;
  used: string;
};

const GameState: React.FunctionComponent<Props> = ({ notification, turnsLeft, letters, used }) => (
  <>
    {notification && <Notification variant={notification.type}>{notification.message}</Notification>}
    <p>Turns left: {turnsLeft}</p>
    <p>Letters: {letters}</p>
    <p>Used: {used}</p>
  </>
);

export default GameState;
