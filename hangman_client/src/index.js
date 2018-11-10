import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import NavigationBar from './components/NavigationBar';

ReactDOM.render(
  <>
    <CssBaseline />
    <NavigationBar />
    <App />
  </>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
