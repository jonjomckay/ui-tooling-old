import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';

export default class Dashboard extends Component {
    render() {
        const events = [
            {
                date: '1 hour ago',
                summary: 'Linda G. Salaam reset their password'
            },
            {
                date: '1 hour ago',
                summary: 'Pat Bond and Steve Brannon edited Some Random Flow'
            }
        ];

        return (
            <div>
                <Feed events={ events } />
            </div>
        );
    }
}