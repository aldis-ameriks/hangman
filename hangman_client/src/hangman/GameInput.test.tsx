import React from 'react';
import { fireEvent, render, RenderResult, wait } from 'react-testing-library';
import GameInput from './GameInput';

describe('GameInput', () => {
  let makeMove: (guess: string) => void;
  let component: RenderResult;
  const renderComponent = () => render(<GameInput makeMove={makeMove} used={[]} />);

  beforeEach(() => {
    makeMove = jest.fn();
  });

  describe('initially', () => {
    beforeEach(() => {
      component = renderComponent();
    });

    it('makeMove has not been called', () => {
      expect(makeMove).not.toHaveBeenCalled();
    });

    describe('after clicking a button', () => {
      beforeEach(() => {
        const letter = component.getByText('a');
        fireEvent.click(letter);
      });

      it('makeMove is executed', () => {
        expect(makeMove).toHaveBeenCalledWith('a');
      });

      it('same letter is disabled', () => {
        wait(() => {
          expect(component.getByText('a')).toHaveStyle('cursor: not-allowed');
        });
      });
    });
  });
});
