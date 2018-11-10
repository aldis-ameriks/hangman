import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { initializeConnection, startNewGame, makeMove } from './HangmanClient';

class HangmanProvider extends React.Component {
  state = {
    game: null
  };

  notifications = {
    good_guess: { type: 'info', message: 'Lucky.' },
    bad_guess: { type: 'warning', message: 'One step closer to your demise.' },
    invalid_guess: { type: 'warning', message: 'Your negligence disgusts me.' },
    already_used: { type: 'info', message: 'Your negligence disgusts me.' },
    lost: { type: 'error', message: 'Figures.' },
    won: { type: 'success', message: 'You may live another day.' }
  };

  componentDidMount() {
    const handleResponse = tally => this.setState({ game: tally });
    this.channel = initializeConnection('ws://localhost:4000/socket', handleResponse);
  }

  render() {
    const { game } = this.state;

    if (!game) {
      return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
    }

    return this.props.render({
      makeMove: guess => makeMove(this.channel, guess),
      startNewGame: () => startNewGame(this.channel),
      notification: this.notifications[game.game_state],
      letters: game.letters.join(' '),
      used: game.used.join(' '),
      turnsLeft: game.turns_left,
      isGameOver: game.game_state === 'lost' || game.game_state === 'won'
    });
  }
}

HangmanProvider.propTypes = {
  render: PropTypes.func.isRequired
};

export default HangmanProvider;
