import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

export default class TenantIPRestrictionAddModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endIpAddress: '',
            isModalOpen: false,
            name: '',
            startIpAddress: ''
        };
    }

    onChangeEndIpAddress = (event) => {
        this.setState({
            endIpAddress: event.target.value
        });
    };

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    onChangeStartIpAddress = (event) => {
        this.setState({
            startIpAddress: event.target.value
        });
    };

    onSave = () => {
        this.props.onSave({
            endIpAddress: this.state.endIpAddress,
            name: this.state.name,
            startIpAddress: this.state.startIpAddress
        });

        this.props.onClose();
    };

    render() {
        return (
            <Modal closeIcon="close" open={ this.props.open } onClose={ this.props.onClose }>
                <Modal.Header>Add a new IP restriction</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label="Name" placeholder="Name" onChange={ this.onChangeName } />
                        <Form.Group widths="equal">
                            <Form.Input label="Start IP Address" placeholder="1.2.3.4" onChange={ this.onChangeStartIpAddress } />
                            <Form.Input label="End IP Address" placeholder="5.6.7.8" onChange={ this.onChangeEndIpAddress } />
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="red" icon="remove" content="Cancel" onClick={ this.props.onClose } />
                    <Button color="green" icon="checkmark" content="Save" onClick={ this.onSave } />
                </Modal.Actions>
            </Modal>
        );
    }
}