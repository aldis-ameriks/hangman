import React from 'react';
import { render } from 'react-testing-library';
import { NotificationType } from '../components/Notification';
import GameState from './GameState';

describe('GameState', () => {
  const letters = 'letters';
  const turnsLeft = 2;
  const notification = { type: 'error' as NotificationType, message: 'msg' };
  let container: HTMLElement;

  describe('when notification is given', () => {
    beforeEach(() => {
      container = render(
        <GameState notification={notification} turnsLeft={turnsLeft} letters={letters} />,
      ).container;
    });

    it('renders expected content', () => {
      expect(container).toHaveTextContent(notification.message);
      expect(container).toHaveTextContent(`Turns left: ${turnsLeft}`);
      expect(container).toHaveTextContent(`Letters: ${letters}`);
    });
  });

  describe('when notification is not given', () => {
    beforeEach(() => {
      container = render(
        <GameState notification={undefined} turnsLeft={turnsLeft} letters={letters} />,
      ).container;
    });

    it('renders expected content', () => {
      expect(container).not.toHaveTextContent(notification.message);
      expect(container).toHaveTextContent(`Turns left: ${turnsLeft}`);
      expect(container).toHaveTextContent(`Letters: ${letters}`);
    });
  });
});
