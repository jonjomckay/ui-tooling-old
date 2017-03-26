import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import FlowElementSource from '../FlowElementSource';

import 'react-quill/dist/quill.snow.css';

export default class StepElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            developerName: '',
            content: '',
            isOpen: false
        }
    }

    componentDidMount = () => {
        this.setState({
            isOpen: this.props.isOpen
        });
    };

    onChangeName = (e) => {
        this.setState({
            developerName: e.target.value
        });
    };

    onChangeContent = (content) => {
        this.setState({
            content: content
        });
    };

    onCancel = () => {
        this.setState({
            isOpen: false
        });
    };

    onSave = () => {
        const element = {
            developerName: this.state.developerName,
            elementType: 'step',
            userContent: this.state.content,
            x: this.props.x,
            y: this.props.y
        };

        FlowElementSource.create(this.props.flow, this.props.editingToken, element)
            .then(response => console.log(response));

        this.props.onSave();

        this.setState({
            isOpen: false
        });
    };

    render() {
        return (
            <Modal open={ this.state.isOpen }>
                <Header content="Add a new Step" />

                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name</label>

                            <input placeholder="Choose a name for this element" onChange={ this.onChangeName } value={ this.state.developerName } />
                        </Form.Field>

                        <Form.Field>
                            <label>Content</label>

                            <ReactQuill theme="snow" onChange={ this.onChangeContent } value={ this.state.content } />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="red" onClick={ this.onCancel }>
                        Cancel
                    </Button>

                    <Button color="green" onClick={ this.onSave }>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}