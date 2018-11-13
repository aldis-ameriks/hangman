import React from 'react';
import { fireEvent, render, RenderResult, wait } from 'react-testing-library';
import GameInput from './GameInput';

describe('GameInput', () => {
  let makeMove: (guess: string) => void;
  let component: RenderResult;
  const renderComponent = () => render(<GameInput makeMove={makeMove} used={[]} />);
  const letter = 'a';

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

    it('letter is not disabled', () => {
      wait(() => {
        expect(component.getByText(letter)).toHaveStyle('cursor: pointer');
      });
    });

    describe('after clicking a button', () => {
      beforeEach(() => {
        fireEvent.click(component.getByText(letter));
      });

      it('makeMove is executed', () => {
        expect(makeMove).toHaveBeenCalledWith(letter);
      });

      it('letter is disabled', () => {
        wait(() => {
          expect(component.getByText(letter)).toHaveStyle('cursor: not-allowed');
        });
      });
    });
  });
});
