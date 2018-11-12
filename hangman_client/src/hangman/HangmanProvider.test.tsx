import React from 'react';
import { render, RenderResult } from 'react-testing-library';
import * as HangmanClient from './HangmanClient';
import HangmanProvider from './HangmanProvider';

jest.mock('./HangmanClient');

describe('HangmanProvider', () => {
  let initializeGame: jest.Mock<{}>;
  let component: RenderResult;
  beforeEach(() => {
    initializeGame = jest.fn();
    // @ts-ignore
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
      status: 'initializing',
      letters: 'a b',
      used: 'c d',
      turnsLeft: 1,
      startNewGame: expect.any(Function),
      makeMove: expect.any(Function),
    };

    [
      { input: defaultInput, output: defaultOutput },
      { input: { game_state: 'won' }, output: { status: 'won' } },
      { input: { game_state: 'lost' }, output: { status: 'lost' } },
      { input: { game_state: 'good_guess' }, output: { status: 'good_guess' } },
      { input: { game_state: 'bad_guess' }, output: { status: 'bad_guess' } },
      { input: { game_state: 'invalid_guess' }, output: { status: 'invalid_guess' } },
      { input: { game_state: 'already_used' }, output: { status: 'already_used' } },
    ].forEach(({ input, output }) => {
      describe('given Hangman state', () => {
        beforeEach(() => {
          initializeGame = jest.fn().mockImplementation((url, cb) => {
            cb({ ...defaultInput, ...input });
          });
          // @ts-ignore
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
            />,
          );
        });
      });
    });
  });
});
