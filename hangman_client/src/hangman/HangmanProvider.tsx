import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React from 'react';
import { NotificationType } from '../components/Notification';
import { HangmanGameTally, initializeGame, makeMove, startNewGame } from './HangmanClient';

export type HangmanNotification = {
  type: NotificationType;
  message: string;
};

export type HangmanGameState = {
  letters: string;
  used: string;
  turnsLeft: number;
  isGameOver: boolean;
  notification?: HangmanNotification;
  startNewGame: () => void;
  makeMove: (guess: string) => void;
};

type HangmanProviderProps = {
  render: (state: HangmanGameState) => React.ReactNode;
};

class HangmanProvider extends React.Component<HangmanProviderProps, { game?: HangmanGameTally }> {
  private notifications: { [key: string]: HangmanNotification } = {
    good_guess: { type: 'info', message: 'Lucky.' },
    bad_guess: { type: 'warning', message: 'One step closer to your demise.' },
    invalid_guess: { type: 'warning', message: 'Your negligence disgusts me.' },
    already_used: { type: 'info', message: 'Your negligence disgusts me.' },
    lost: { type: 'error', message: 'Figures.' },
    won: { type: 'success', message: 'You may live another day.' },
  };

  constructor(props: HangmanProviderProps) {
    super(props);
    this.state = { game: undefined };
  }

  public componentDidMount() {
    const handleResponse = (tally: HangmanGameTally) => this.setState({ game: tally });
    initializeGame('ws://localhost:4000/socket', handleResponse);
  }

  public render() {
    const { game } = this.state;
    if (!game) {
      return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
    }

    return this.props.render({
      makeMove,
      startNewGame,
      notification: this.notifications[game.game_state],
      letters: game.letters.join(' '),
      used: game.used.join(' '),
      turnsLeft: game.turns_left,
      isGameOver: game.game_state === 'lost' || game.game_state === 'won',
    });
  }
}

export default HangmanProvider;
