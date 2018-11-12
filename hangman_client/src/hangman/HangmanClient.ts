import { Socket } from 'phoenix-socket';
import { GameState, GameStatus } from './HangmanProvider';

export type GameTally = {
  game_state: GameStatus;
  turns_left: number;
  used: string[];
  letters: string[];
};

let channel: any = null;

const setupSocket = (url: string) => {
  const socket = new Socket(url, {});
  socket.connect();
  return socket;
};

const setupChannel = (socket: any, handleResponse: (game: GameState) => void) => {
  channel = socket.channel('hangman:game', {});
  channel
    .join()
    // .receive('ok', () => {})
    .receive('error', (resp: () => void) => {
      throw resp;
    });

  const convertTallyAndHandleResponse = (tally: GameTally) => {
    handleResponse({ status: tally.game_state, letters: tally.letters, turnsLeft: tally.turns_left, used: tally.used });
  };

  channel.on('make_move', convertTallyAndHandleResponse);
  channel.on('new_game', convertTallyAndHandleResponse);
  channel.push('new_game', {});
};

export const initializeGame = (url: string, handleResponse: (game: GameState) => void) => {
  const socket = setupSocket(url);
  setupChannel(socket, handleResponse);
};

export const startNewGame = () => {
  console.log('Starting new game');
  channel.push('new_game', {});
};

export const makeMove = (guess: string) => {
  channel.push('make_move', { guess });
};
