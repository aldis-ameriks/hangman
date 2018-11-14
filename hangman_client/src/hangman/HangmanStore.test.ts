import { when } from 'mobx';
import * as HangmanClient from './HangmanClient';
import HangmanStore from './HangmanStore';

jest.mock('./HangmanClient');

describe('HangmanStore', () => {
  let hangmanStore: HangmanStore;
  let initializeGame: jest.Mock<{}>;

  beforeEach(() => {
    initializeGame = jest.fn();
    // @ts-ignore
    HangmanClient.initializeGame = initializeGame;
  });

  describe('initially', () => {
    it('returns default state', () => {
      hangmanStore = new HangmanStore();
      expect(hangmanStore).toEqual({});
      expect(hangmanStore.gameState).toBe('loading');
    });

    describe('after initializing game', () => {
      beforeEach(() => {
        initializeGame = jest.fn().mockImplementation((url, cb) => {
          cb({ game_state: 'initializing', letters: ['a', 'b'], used: ['c', 'd'], turns_left: 1 });
        });
        // @ts-ignore
        HangmanClient.initializeGame = initializeGame;
        hangmanStore.initializeGame();
      });

      it('returns correct state', done => {
        when(
          () => hangmanStore.gameState === 'initializing',
          () => {
            expect(hangmanStore.letters).toBe('a b');
            expect(hangmanStore.used).toEqual(['c', 'd']);
            expect(hangmanStore.turnsLeft).toBe(1);
            expect(hangmanStore.notification.type).toBe('info');
            expect(hangmanStore.isGameOver).toBeFalsy();
            done();
          },
        );
      });
    });
  });

  describe('notifications', () => {
    [
      { state: 'won', notificationType: 'success' },
      { state: 'lost', notificationType: 'error' },
      { state: 'good_guess', notificationType: 'info' },
      { state: 'already_used', notificationType: 'info' },
      { state: 'initializing', notificationType: 'info' },
      { state: 'invalid_guess', notificationType: 'warning' },
      { state: 'bad_guess', notificationType: 'warning' },
    ].forEach(({ state, notificationType }) => {
      it('renders correct notification', done => {
        initializeGame = jest.fn().mockImplementation((url, cb) => {
          cb({ game_state: state, letters: ['a', 'b'], used: ['c', 'd'], turns_left: 1 });
        });
        // @ts-ignore
        HangmanClient.initializeGame = initializeGame;
        hangmanStore.initializeGame();
        when(
          () => hangmanStore.gameState === state,
          () => {
            expect(hangmanStore.notification.type).toBe(notificationType);
            done();
          },
        );
      });
    });
  });
});
