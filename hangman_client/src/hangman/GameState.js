import PropTypes from 'prop-types';
import React from 'react';

import Notification from '../components/Notification';

const GameState = ({ notification, turnsLeft, letters, used }) => (
  <>
    {notification && <Notification variant={notification.type}>{notification.message}</Notification>}
    <p>Turns left: {turnsLeft}</p>
    <p>Letters: {letters}</p>
    <p>Used: {used}</p>
  </>
);

GameState.propTypes = {
  notification: PropTypes.shape({ type: PropTypes.string, message: PropTypes.string }),
  turnsLeft: PropTypes.number.isRequired,
  letters: PropTypes.string.isRequired,
  used: PropTypes.string.isRequired
};

export default GameState;
