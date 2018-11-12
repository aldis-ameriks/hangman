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

    it('does not render anything', () => {
      expect(component.queryByText('test')).toBeNull();
    });

    it('initializes new game', () => {
      expect(initializeGame).toHaveBeenCalledTimes(1);
      expect(initializeGame).toHaveBeenCalledWith('ws://localhost:4000/socket', expect.any(Function));
    });
  });

  describe('after game has been initialized', () => {
    beforeEach(() => {
      initializeGame = jest.fn().mockImplementation((url, cb) => {
        cb({ status: 'initializing', letters: ['a', 'b'], used: ['c', 'd'], turnsLeft: 1 });
      });
      // @ts-ignore
      HangmanClient.initializeGame = initializeGame;
    });

    it('returns correct state', done => {
      render(
        <HangmanProvider
          render={result => {
            expect(result).toEqual({
              status: 'initializing',
              letters: ['a', 'b'],
              used: ['c', 'd'],
              turnsLeft: 1,
              startNewGame: expect.any(Function),
              makeMove: expect.any(Function),
            });
            done();
            return null;
          }}
        />,
      );
    });
  });
});
