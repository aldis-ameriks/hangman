import React from 'react';
import { render } from 'react-testing-library';
import HangmanProvider from './HangmanProvider';
import * as HangmanClient from './HangmanClient';

jest.mock('./HangmanClient');

describe('HangmanProvider', () => {
  let initializeGame;
  let component;
  beforeEach(() => {
    initializeGame = jest.fn();
    HangmanClient.initializeGame = initializeGame;
  });

  describe('initially', () => {
    beforeEach(() => {
      expect(initializeGame).not.toHaveBeenCalled();
      component = render(<HangmanProvider render={() => <div>test</div>} />);
    });

    it('renders loader', () => {
      expect(component.queryByRole('progressbar')).toBeInTheDocument();
    });

    it('initializes new game', () => {
      expect(initializeGame).toHaveBeenCalledTimes(1);
      expect(initializeGame).toHaveBeenCalledWith('ws://localhost:4000/socket', expect.any(Function));
    });
  });

  describe('when initializing game', () => {
    const defaultInput = { game_state: 'initializing', letters: ['a', 'b'], used: ['c', 'd'], turns_left: 1 };
    const defaultOutput = {
      isGameOver: false,
      letters: 'a b',
      used: 'c d',
      turnsLeft: 1,
      notification: undefined,
      startNewGame: expect.any(Function),
      makeMove: expect.any(Function)
    };

    [
      {
        input: defaultInput,
        output: defaultOutput
      },
      {
        input: { game_state: 'won' },
        output: { isGameOver: true, notification: { type: 'success', message: 'You may live another day.' } }
      },
      {
        input: { game_state: 'lost' },
        output: { isGameOver: true, notification: { type: 'error', message: 'Figures.' } }
      },
      {
        input: { game_state: 'good_guess' },
        output: { notification: { type: 'info', message: 'Lucky.' } }
      },
      {
        input: { game_state: 'bad_guess' },
        output: { notification: { type: 'warning', message: 'One step closer to your demise.' } }
      },
      {
        input: { game_state: 'invalid_guess' },
        output: { notification: { type: 'warning', message: 'Your negligence disgusts me.' } }
      },
      {
        input: { game_state: 'already_used' },
        output: { notification: { type: 'info', message: 'Your negligence disgusts me.' } }
      }
    ].forEach(({ input, output }) => {
      describe('given Hangman state', () => {
        beforeEach(() => {
          initializeGame = jest.fn().mockImplementation((url, cb) => {
            cb({ ...defaultInput, ...input });
          });
          HangmanClient.initializeGame = initializeGame;
        });
        it('returns correct state', done => {
          render(
            <HangmanProvider
              render={result => {
                expect(result).toEqual({ ...defaultOutput, ...output });
                done();
                return null;
              }}
            />
          );
        });
      });
    });
  });
});
