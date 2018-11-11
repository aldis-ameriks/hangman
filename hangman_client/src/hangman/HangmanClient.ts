// @ts-ignore
import { Socket } from 'phoenix-socket';

export type HangmanGameTally = {
  game_state: string;
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

const setupChannel = (socket: any, handleResponse: (tally: HangmanGameTally) => void) => {
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

export const initializeGame = (url: string, handleResponse: (tally: HangmanGameTally) => void) => {
  const socket = setupSocket(url);
  setupChannel(socket, handleResponse);
};

export const startNewGame = () => {
  channel.push('new_game', {});
};

export const makeMove = (guess: string) => {
  channel.push('make_move', { guess });
};
