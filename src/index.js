import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
  <App />,
  rootElement
);
