import React from 'react';
import { render } from 'react-testing-library';
import HangmanProvider from './HangmanProvider';

describe('HangmanProvider', () => {
  it('renders', () => {
    // TODO: What's the best way to mock sockets?
    // TODO: Mock HangmanClient or mock socket server?
    const result = render(<HangmanProvider render={() => <div>test</div>} />);
  });
});
