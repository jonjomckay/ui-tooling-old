import React, { Component } from 'react';
import { Button, Dropdown, Header, Menu, Modal } from 'semantic-ui-react';
import moment from 'moment';

import Loadable from '../Loadable';
import UserSource from '../users/UserSource';

export default class TenantSwitcher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isOpen: false,
            tenants: []
        };
    }

    onMount = () => {
        UserSource.fetchMe()
            .then(response => {
                this.setState({
                    isLoading: false,
                    tenants: response.tenants
                });
            });
    };

    onOpen = () => {
        this.setState({
            isOpen: true
        });
    };

    onClose = () => {
        this.setState({
            isOpen: false
        });
    };

    render() {
        const options = this.state.tenants.map(tenant => {
            let lastLoggedIn;

            if (tenant.lastLoggedInAt) {
                lastLoggedIn = 'Last logged in ' + moment(tenant.lastLoggedInAt).fromNow();
            } else {
                lastLoggedIn = ' ';
            }

            return {
                content: <Header as="h4" content={ tenant.developerName } subheader={ lastLoggedIn } />,
                key: tenant.id,
                text: tenant.developerName,
                value: tenant.id
            };
        });

        return (
            <Modal onMount={ this.onMount } open={ this.state.isOpen } trigger={ <Menu.Item onClick={ this.onOpen }>Switch tenant</Menu.Item> }>
                <Header content="Switch tenant" />

                <Modal.Content>
                    <Loadable loading={ this.state.isLoading }>
                        <Dropdown fluid search selection
                                  onChange={ this.onChooseTenant }
                                  options={ options }
                                  placeholder="Choose a tenant" />
                    </Loadable>
                </Modal.Content>

                <Modal.Actions>
                    <Button color="red" onClick={ this.onClose }>
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