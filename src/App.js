import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.css';
import './App.css';

import AppTooling from './AppTooling';
import AppLogin from './AppLogin';


class App extends Component {
    render() {
        let content;

        if (this.props.token) {
            content = (
                <BrowserRouter>
                    <AppTooling />
                </BrowserRouter>
            );
        } else {
            content = <AppLogin />;
        }

        return content;
    }
}

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(App);
