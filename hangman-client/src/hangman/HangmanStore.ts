import { action, computed, observable } from 'mobx';
import { HangmanGameTally, initializeGame, makeMove, startNewGame } from './HangmanClient';

export type HangmanNotification = {
  type: string;
  message: string;
};

const notifications: { [key: string]: HangmanNotification } = {
  good_guess: { type: 'warning', message: 'Lucky.' },
  bad_guess: { type: 'warning', message: 'One step closer to your demise.' },
  invalid_guess: { type: 'warning', message: "That's not a valid guess." },
  already_used: { type: 'warning', message: 'You already guessed that.' },
  initializing: { type: 'warning', message: 'Make your move.' },
  lost: { type: 'error', message: 'Oh no... try again?' },
  won: { type: 'warning', message: 'You may live another day.' },
};

class HangmanStore {
  @observable
  public game: HangmanGameTally = { game_state: 'loading' } as HangmanGameTally;

  @computed
  get gameState() {
    return this.game.game_state;
  }

  @computed
  get turnsLeft() {
    return this.game.turns_left;
  }

  @computed
  get notification() {
    return notifications[this.game.game_state];
  }

  @computed
  get isGameOver() {
    const { game_state } = this.game;
    return game_state === 'won' || game_state === 'lost';
  }

  @computed
  get letters() {
    return this.game.letters && this.game.letters.join(' ');
  }

  @computed
  get used() {
    return this.game.used;
  }

  @action
  public initializeGame() {
    const handleResponse = (tally: HangmanGameTally) => (this.game = tally);
    initializeGame(
      process.env.REACT_APP_BACKEND_URL || 'ws://localhost:4000/socket',
      handleResponse,
    );
  }

  @action
  public startNewGame() {
    startNewGame();
  }

  @action
  public makeMove(guess: string) {
    makeMove(guess);
  }
}

export default HangmanStore;
