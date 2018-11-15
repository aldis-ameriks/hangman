import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import App from './App';
import HangmanStore from './hangman/HangmanStore';

const hangmanStore = new HangmanStore();

const renderApp = () => {
  // @ts-ignore
  return <App />;
};

ReactDOM.render(
  <Provider hangmanStore={hangmanStore}>{renderApp()}</Provider>,
  document.getElementById('root'),
);

if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept();
}
