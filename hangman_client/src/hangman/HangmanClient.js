import { Socket } from 'phoenix-socket';

let channel = null;

const setupSocket = url => {
  const socket = new Socket(url, {});
  socket.connect();
  return socket;
};

const setupChannel = (socket, handleResponse) => {
  channel = socket.channel('hangman:game', {});
  channel
    .join()
    .receive('ok', resp => {
      console.log(`connected: ${resp}`);
    })
    .receive('error', resp => {
      alert(resp);
      throw resp;
    });

  channel.on('make_move', handleResponse);
  channel.on('new_game', handleResponse);
  channel.push('new_game', {});
};

export const initializeGame = (url, handleResponse) => {
  const socket = setupSocket(url);
  setupChannel(socket, handleResponse);
};

export const startNewGame = () => {
  channel.push('new_game', {});
};

export const makeMove = guess => {
  channel.push('make_move', { guess });
};
