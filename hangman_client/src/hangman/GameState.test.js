import React from 'react';
import { render } from 'react-testing-library';
import GameState from './GameState';

describe('GameState', () => {
  const used = 'used';
  const letters = 'letters';
  const turnsLeft = 2;
  const notification = { type: 'error', message: 'msg' };
  let container;

  describe('when notification is given', () => {
    beforeEach(() => {
      container = render(<GameState notification={notification} used={used} turnsLeft={turnsLeft} letters={letters} />)
        .container;
    });

    it('renders expected content', () => {
      expect(container).toHaveTextContent(notification.message);
      expect(container).toHaveTextContent(`Turns left: ${turnsLeft}`);
      expect(container).toHaveTextContent(`Letters: ${letters}`);
      expect(container).toHaveTextContent(`Used: ${used}`);
    });
  });

  describe('when notification is not given', () => {
    beforeEach(() => {
      container = render(<GameState notification={null} used={used} turnsLeft={turnsLeft} letters={letters} />)
        .container;
    });

    it('renders expected content', () => {
      expect(container).not.toHaveTextContent(notification.message);
      expect(container).toHaveTextContent(`Turns left: ${turnsLeft}`);
      expect(container).toHaveTextContent(`Letters: ${letters}`);
      expect(container).toHaveTextContent(`Used: ${used}`);
    });
  });
});
