import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.css';
import './App.css';

import AppContent from './AppContent';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <AppContent />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
