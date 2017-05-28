import React, { Component } from 'react';
import { Form, Header, Image, Table } from 'semantic-ui-react';
import gravatar from 'gravatar';

import Loadable from '../Loadable';
import UserSource from './UserSource';

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            users: []
        };
    }

    componentDidMount = () => {
        UserSource.fetchAll()
            .then(response => {
                this.setState({
                    isLoading: false,
                    users: response
                });
            });
    };

    render() {
        const users = this.state.users.map(user => {
            const avatar = gravatar.url(user.email, { s: '100' }, true);

            return (
                <Table.Row key={ user.id }>
                    <Table.Cell>
                        <Header as="h4" image>
                            <Image shape="rounded" size="mini" src={ avatar } />

                            <Header.Content>
                                { user.firstName } { user.lastName }
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        { user.email }
                    </Table.Cell>
                </Table.Row>
            )
        });

        return (
            <Loadable loading={ this.state.isLoading }>
                <Header as="h2">
                    <Header.Content>
                        Users

                        <Header.Subheader>
                            A bunch of information about users in the current tenant
                        </Header.Subheader>
                    </Header.Content>
                </Header>

                <Form>
                    <Form.Group>
                        <Form.Input width="8" placeholder="Search" fluid onChange={ this.onSearch } />

                        <Form.Button fluid floated="right" color="green" content="Add User" icon="add circle" labelPosition="left" />
                        <Form.Button fluid floated="right" color="blue" content="Invite User" icon="envelope" labelPosition="left" />
                    </Form.Group>
                </Form>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { users }
                    </Table.Body>
                </Table>
            </Loadable>
        );
    }
}