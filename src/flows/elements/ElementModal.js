import React, { Component } from 'react';
import StepElement from './StepElement';

export default class ElementModal extends Component {
    render() {
        let modal;

        switch (this.props.type) {
            case 'step':
                modal = <StepElement { ...this.props } />;
                break;
            default:
                modal = <div></div>;
                break;
        }

        return (
            <div>
            { modal }
            </div>
        );
    }
}