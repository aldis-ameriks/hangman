import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root'),
);

if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept();
}
