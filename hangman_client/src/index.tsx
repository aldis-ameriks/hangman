import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if ((module as any).hot && process.env.NODE_ENV !== 'production') {
  (module as any).hot.accept();
}
