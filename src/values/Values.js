import React, { Component } from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ValueSource from './ValueSource';
import Loadable from '../Loadable';

export default class Values extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            loading: true
        };
    }

    componentDidMount = () => {
        ValueSource.fetchAll().then(response => {
            this.setState({
                values: response,
                loading: false
            });
        });
    };

    render() {
        const flows = this.state.values.map(value => {
            let type = <em>None</em>;
            if (value.typeElementDeveloperName) {
                type = <Link to={ "/elements/types/" + value.typeElementId }>{ value.typeElementDeveloperName }</Link>
            }

            return (
                <Table.Row key={ value.id }>
                    <Table.Cell>{ value.developerName }</Table.Cell>
                    <Table.Cell>{ value.contentType }</Table.Cell>
                    <Table.Cell>{ type }</Table.Cell>
                </Table.Row>
            )
        });

        return (
            <div>
                <Header as="h1">
                    Values
                    <Header.Subheader>Some description here about what values are</Header.Subheader>
                </Header>

                <Form>
                    <Form.Group>
                        <Form.Input width="8" placeholder="Search" fluid action={{ icon: "search" }} />

                        <Form.Button width="8" floated="right" color="green" content="New Flow" icon="add circle" labelPosition="left" />
                    </Form.Group>
                </Form>

                <Loadable loading={ this.state.loading }>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Content Type</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            { flows }
                        </Table.Body>
                    </Table>
                </Loadable>
            </div>
        );
    }
}