import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import App from './App';
import userReducer from './users/UserReducer';

const rootElement = document.getElementById('root');

if (module.hot) {
    module.hot.accept();
}

const store = createStore(combineReducers({
    user: userReducer
}));

const app = (
    <Provider store={ store }>
        <App />
    </Provider>
);

ReactDOM.render(app, rootElement);
