import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import NewGameButton from './NewGameButton';

describe('NewGameButton', () => {
  let startNewGame;
  const wrapper = () => render(<NewGameButton classes={{}} startNewGame={startNewGame} />);

  beforeEach(() => {
    startNewGame = jest.fn();
  });

  describe('initially', () => {
    beforeEach(() => {
      wrapper();
    });

    it('handler is not executed', () => {
      expect(startNewGame).not.toHaveBeenCalled();
    });
  });

  describe('clicking button', () => {
    beforeEach(() => {
      const button = wrapper().getByText('Start new game');
      fireEvent.click(button);
    });

    it('executes handler', () => {
      expect(startNewGame).toHaveBeenCalled();
    });
  });
});
