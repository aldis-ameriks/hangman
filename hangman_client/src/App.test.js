import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

describe('App', () => {
  it('initially', () => {
    // TODO: What's the best approach for mocking sockets?
    const component = render(<App />);
    expect(component.baseElement).toMatchSnapshot();
  });
});
