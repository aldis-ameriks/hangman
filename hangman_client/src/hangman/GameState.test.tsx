import React from 'react';
import { render, RenderResult, wait, waitForElement } from 'react-testing-library';
import GameState from './GameState';

describe('GameState', () => {
  const letters = 'letters';
  const turnsLeft = 2;
  const notification = { type: 'error', message: 'msg' };
  let component: RenderResult;

  describe('when notification is given', () => {
    beforeEach(() => {
      component = render(
        <GameState notification={notification} turnsLeft={turnsLeft} letters={letters} />,
      );
    });

    it('renders expected content', async () => {
      await waitForElement(() => component.queryByText('msg'));
      expect(component.queryByText('msg')).toBeInTheDocument();
      expect(component.queryByText(`Turns left: ${turnsLeft}`)).toBeInTheDocument();
      expect(component.queryByText(`Letters: ${letters}`)).toBeInTheDocument();
    });
  });

  describe('when notification is not given', () => {
    beforeEach(() => {
      component = render(
        <GameState notification={undefined} turnsLeft={turnsLeft} letters={letters} />,
      );
    });

    it('renders expected content', () => {
      expect(component.queryByText('msg')).not.toBeInTheDocument();
      expect(component.queryByText(`Turns left: ${turnsLeft}`)).toBeInTheDocument();
      expect(component.queryByText(`Letters: ${letters}`)).toBeInTheDocument();
    });
  });
});
