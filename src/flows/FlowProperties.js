import React, { Component } from 'react';
import { Button, Form, Header, Modal, Select } from 'semantic-ui-react';
import update from 'immutability-helper';
import FlowSource from './FlowSource';
import ServiceSource from '../services/ServiceSource';
import Loadable from "../Loadable";

class ServicePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            services: []
        };
    }

    componentDidMount = () => {
        ServiceSource.fetchAll()
            .then(response => {
                this.setState({
                    isLoading: false,
                    services: response
                });
            });
    };

    render() {
        const services = this.state.services.map(service => {
            return { key: service.id, value: service.id, text: service.developerName };
        });

        return (
            <Select onChange={ this.props.onChange } value={ this.props.selected } label="Service" loading={ this.state.isLoading } options={ services } />
        )
    };
}

class FlowProperties extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flow: {
                authorization: {
                    serviceElementId: ''
                },
                developerName: ''
            },
            isLoading: true
        }
    }

    componentDidMount = () => {
        FlowSource.fetch(this.props.id)
            .then(response => {
                this.setState({
                    flow: response,
                    isLoading: false
                });
            });
    };

    onChangeName = (e) => {
        this.setState({
            flow: update(this.state.flow, {
                $merge: {
                    developerName: e.target.value
                }
            })
        })
    };

    onChangeIdentityService = (e, { value }) => {
        this.setState({
            flow: update(this.state.flow, {
                authorization: {
                    $merge: {
                        serviceElementId: value
                    }
                }
            })
        })
    };

    render() {
        return (
            <Modal open>
                <Header content={ this.state.flow.developerName } />

                <Modal.Content>
                    <Loadable loading={ this.state.isLoading }>
                        <Form>
                            <Form.Field>
                                <label>Name</label>

                                <input onChange={ this.onChangeName } value={ this.state.flow.developerName } />
                            </Form.Field>

                            <Header as="h3" content="Identity " />

                            <Form.Group widths="equal">
                                <Form.Field>
                                    <label>Identity Service</label>

                                    <ServicePicker onChange={ this.onChangeIdentityService } selected={ this.state.flow.authorization.serviceElementId } />
                                </Form.Field>

                                <Form.Field label="Access" control="select">
                                    <option value="ALL_USERS">All Users</option>
                                    <option value="PUBLIC">Public</option>
                                    <option value="SPECIFIED">Specific Users & Groups</option>
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Loadable>
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

FlowProperties.propTypes = {
    id: React.PropTypes.string.isRequired
};

export default FlowProperties;