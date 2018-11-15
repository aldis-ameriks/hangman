import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import App from './App';
import * as HangmanClient from './hangman/HangmanClient';
import HangmanStore from './hangman/HangmanStore';

jest.mock('./hangman/HangmanClient');

describe('App', () => {
  let initializeGame;
  // @ts-ignore
  HTMLCanvasElement.prototype.getContext = () => ({
    beginPath: jest.fn(),
    clearRect: jest.fn(),
    stroke: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    arc: jest.fn(),
  });

  describe('initially', () => {
    it('renders loader', () => {
      const hangmanStore = new HangmanStore();
      const component = render(<App hangmanStore={hangmanStore} />);
      expect(component.queryByTestId('game-input')).toBeNull();
    });
  });

  describe('when game has loaded', () => {
    beforeEach(() => {
      initializeGame = jest.fn().mockImplementation((url, cb) => {
        cb({ game_state: 'initializing', letters: [], used: [], turns_left: 1 });
      });
      // @ts-ignore
      HangmanClient.initializeGame = initializeGame;
    });

    it('renders the game', async () => {
      const hangmanStore = new HangmanStore();
      const component = render(<App hangmanStore={hangmanStore} />);
      const gameTitle = component.getByTestId('game-input');
      await waitForElement(() => gameTitle);
      expect(gameTitle).toBeInTheDocument();
    });
  });

  describe('when game is lost', () => {
    beforeEach(() => {
      initializeGame = jest.fn().mockImplementation((url, cb) => {
        cb({ game_state: 'lost', letters: [], used: [], turns_left: 1 });
      });
      // @ts-ignore
      HangmanClient.initializeGame = initializeGame;
    });

    it('renders button to start new game', async () => {
      const hangmanStore = new HangmanStore();
      const component = render(<App hangmanStore={hangmanStore} />);
      const newGameButton = component.getByText('Start new game');
      await waitForElement(() => newGameButton);
      expect(newGameButton).toBeInTheDocument();
    });
  });
});
