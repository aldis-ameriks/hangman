import React from 'react';
import { initializeGame, makeMove, startNewGame } from './HangmanClient';

export type GameStatus =
  | 'initializing'
  | 'started'
  | 'good_guess'
  | 'bad_guess'
  | 'invalid_guess'
  | 'already_used'
  | 'lost'
  | 'won';

export type GameState = {
  letters: string[];
  used: string[];
  turnsLeft: number;
  status: GameStatus;
};

type GameControls = {
  startNewGame: () => void;
  makeMove: (guess: string) => void;
};

export type HangmanGame = GameState & GameControls;

type HangmanProviderProps = {
  render: (game: HangmanGame) => React.ReactNode;
};

class HangmanProvider extends React.Component<HangmanProviderProps, { game?: GameState }> {
  constructor(props: HangmanProviderProps) {
    super(props);
    this.state = { game: undefined };
  }

  public componentDidMount() {
    const handleResponse = (game: GameState) => this.setState({ game });
    initializeGame('ws://localhost:4000/socket', handleResponse);
  }

  public render() {
    if (!this.state.game) {
      return null;
    }
    const { letters, used, turnsLeft, status } = this.state.game;
    return this.props.render({ makeMove, startNewGame, letters, used, turnsLeft, status });
  }
}

export default HangmanProvider;
