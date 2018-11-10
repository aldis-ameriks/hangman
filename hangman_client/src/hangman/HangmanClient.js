import { Socket } from 'phoenix-socket';

const setupSocket = url => {
  const socket = new Socket(url, {});
  socket.connect();
  return socket;
};

const setupChannel = (socket, handleResponse) => {
  const channel = socket.channel('hangman:game', {});
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
  return channel;
};

export const initializeConnection = (url, handleResponse) => {
  const socket = setupSocket(url);
  const channel = setupChannel(socket, handleResponse);
  return channel;
};

export const startNewGame = channel => {
  channel.push('new_game', {});
};

export const makeMove = (channel, guess) => {
  channel.push('make_move', { guess });
};
