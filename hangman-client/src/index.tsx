import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import ReactGA from 'react-ga';
import App from './App';
import HangmanStore from './hangman/HangmanStore';

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

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
