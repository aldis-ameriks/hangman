import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import GameInput from './GameInput';

describe('GameInput', () => {
  let makeMove;
  let component;
  const renderComponent = () => render(<GameInput makeMove={makeMove} classes={{}} />);

  beforeEach(() => {
    makeMove = jest.fn();
  });

  describe('initially', () => {
    beforeEach(() => {
      component = renderComponent();
    });

    it('makeMove has not been called', () => {
      expect(makeMove).not.toHaveBeenCalled();
      const input = component.getByTestId('guess');
      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('after inputting', () => {
    let input;

    beforeEach(() => {
      component = renderComponent();
      input = component.getByTestId('guess');
      fireEvent.change(input, {
        target: { value: 'c' }
      });
    });

    it('updates input', () => {
      expect(input).toHaveAttribute('value', 'c');
    });

    describe('and clicking submit', () => {
      beforeEach(() => {
        const button = component.getByText('Test your luck');
        fireEvent.click(button);
      });

      it('clears input and calls makeMove', () => {
        expect(makeMove).toHaveBeenCalledWith('c');
        expect(input).toHaveAttribute('value', '');
      });
    });
  });
});
