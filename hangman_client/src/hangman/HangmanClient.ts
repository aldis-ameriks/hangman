import { Socket } from 'phoenix-socket';
import { GameStatus } from './HangmanProvider';

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

const setupChannel = (socket: any, handleResponse: (tally: GameTally) => void) => {
  channel = socket.channel('hangman:game', {});
  channel
    .join()
    // .receive('ok', () => {})
    .receive('error', (resp: () => void) => {
      throw resp;
    });

  channel.on('make_move', handleResponse);
  channel.on('new_game', handleResponse);
  channel.push('new_game', {});
};

export const initializeGame = (url: string, handleResponse: (tally: GameTally) => void) => {
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
