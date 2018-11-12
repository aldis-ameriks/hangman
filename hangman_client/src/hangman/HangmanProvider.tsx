import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React from 'react';
import { GameTally, initializeGame, makeMove, startNewGame } from './HangmanClient';

export type GameStatus = 'good_guess' | 'bad_guess' | 'invalid_guess' | 'already_used' | 'lost' | 'won';

export type GameState = {
  letters: string;
  used: string;
  turnsLeft: number;
  status: GameStatus;
  startNewGame: () => void;
  makeMove: (guess: string) => void;
};

type HangmanProviderProps = {
  render: (state: GameState) => React.ReactNode;
};

class HangmanProvider extends React.Component<HangmanProviderProps, { game?: GameTally }> {
  constructor(props: HangmanProviderProps) {
    super(props);
    this.state = { game: undefined };
  }

  public componentDidMount() {
    const handleResponse = (tally: GameTally) => this.setState({ game: tally });
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
      letters: game.letters.join(' '),
      used: game.used.join(' '),
      turnsLeft: game.turns_left,
      status: game.game_state,
    });
  }
}

export default HangmanProvider;
