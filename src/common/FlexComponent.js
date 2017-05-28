import React, { Component } from 'react';

export default class FlexComponent extends Component {
    render() {
        return (
            <div className="height-100 flex-column">
                { this.props.children }
            </div>
        );
    }
}