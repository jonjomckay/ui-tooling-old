import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import TenantIPRestrictionAddModal from './TenantIPRestrictionAddModal';

export default class TenantIPRestrictionTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddModalOpen: false
        };
    }

    openAddModal = (event) => {
        event.preventDefault();

        this.setState({
            isAddModalOpen: true
        });
    };

    closeAddModal = () => {
        this.setState({
            isAddModalOpen: false
        });
    };

    render() {
        const restrictions = this.props.restrictions || [];

        let table = null;
        if (this.props.enabled) {
            const rows = restrictions.map(restriction => {
                return (
                    <Table.Row key={ restriction.startIPAddress + restriction.endIPAddress }>
                        <Table.Cell>{ restriction.developerName }</Table.Cell>
                        <Table.Cell>{ restriction.startIPAddress }</Table.Cell>
                        <Table.Cell>{ restriction.endIPAddress }</Table.Cell>
                    </Table.Row>
                );
            });

            table = (
                <div>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Start IP Address</Table.HeaderCell>
                                <Table.HeaderCell>End IP Address</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            { rows }
                        </Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan="3">
                                    <Button primary content="New" icon="add circle" labelPosition="left" floated="right" onClick={ this.openAddModal } />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>

                    <TenantIPRestrictionAddModal
                        onSave={ this.props.onAdd }
                        onClose={ this.closeAddModal }
                        open={ this.state.isAddModalOpen } />
                </div>
            );
        }

        return table;
    }
}