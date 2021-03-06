import * as pheonix from 'phoenix-socket';
import { HangmanGameTally, initializeGame, makeMove, startNewGame } from './HangmanClient';

jest.mock('phoenix-socket');

describe('HangmanClient', () => {
  let channelStub: jest.Mock<{}>;
  let pushStub: jest.Mock<{}>;
  let onStub: jest.Mock<{}>;
  let receiveStub: jest.Mock<{}>;
  let handleResponse: (tally: HangmanGameTally) => void;

  class ChannelMock {
    public receive(event: string, handler: any) {
      receiveStub(event, handler);
      return this;
    }

    public join() {
      return this;
    }

    public on(event: string, handler: any) {
      onStub(event, handler);
      return this;
    }

    public push(event: string, params: any) {
      pushStub(event, params);
      return this;
    }
  }

  // noinspection TsLint
  class SocketMock {
    // noinspection TsLint
    public connect() {}
    public channel(name: string, params: any) {
      channelStub(name, params);
      return new ChannelMock();
    }
  }

  beforeEach(() => {
    handleResponse = jest.fn();
    pushStub = jest.fn();
    channelStub = jest.fn();
    onStub = jest.fn();
    receiveStub = jest.fn();
    pheonix.Socket = SocketMock;
  });

  describe('when initialization returns an error', () => {
    const error = new Error('connection error');

    it('throws', () => {
      receiveStub.mockImplementation((event, cb) => event === 'error' && cb(error));
      try {
        initializeGame('ws://test:1234/socket', handleResponse);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe('when initialization returns success', () => {
    const response = 'response';

    it('does not throw', () => {
      receiveStub.mockImplementation((event, cb) => event === 'ok' && cb(response));
      initializeGame('ws://test:1234/socket', handleResponse);
    });
  });

  describe('after initialization', () => {
    beforeEach(() => {
      initializeGame('ws://test:1234/socket', handleResponse);
    });

    it('initializes channel', () => {
      expect(channelStub).toHaveBeenCalledTimes(1);
      expect(channelStub).toHaveBeenCalledWith('hangman:game', {});
    });

    it('sets event handlers', () => {
      expect(onStub).toHaveBeenCalledTimes(2);
      expect(onStub).toHaveBeenCalledWith('new_game', handleResponse);
      expect(onStub).toHaveBeenCalledWith('make_move', handleResponse);
    });

    it('starts a new game', () => {
      expect(pushStub).toHaveBeenCalledTimes(1);
      expect(pushStub).toHaveBeenCalledWith('new_game', {});
    });

    describe('startNewGame', () => {
      it('starts a new game', () => {
        startNewGame();
        expect(pushStub).toHaveBeenCalledTimes(2);
        expect(pushStub).toHaveBeenLastCalledWith('new_game', {});
      });
    });

    describe('makeMove', () => {
      it('makes a move', () => {
        const guess = 'p';
        makeMove(guess);
        expect(pushStub).toHaveBeenCalledTimes(2);
        expect(pushStub).toHaveBeenLastCalledWith('make_move', { guess });
      });
    });
  });
});
