import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import App from './App';
import * as HangmanClient from './hangman/HangmanClient';

jest.mock('./hangman/HangmanClient');

describe('App', () => {
  let initializeGame;

  describe('initially', () => {
    it('renders loader', () => {
      const component = render(<App />);
      expect(component.queryByRole('progressbar')).toBeInTheDocument();
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
      const component = render(<App />);
      const gameTitle = component.getByText('Enter your best guess below.');
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
      const component = render(<App />);
      const newGameButton = component.getByText('Start new game');
      await waitForElement(() => newGameButton);
      expect(newGameButton).toBeInTheDocument();
    });
  });
});
