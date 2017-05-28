import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form, Header, Icon } from 'semantic-ui-react';
import FlowSource from './FlowSource';
import Loadable from '../Loadable';
import FlexComponent from '../common/FlexComponent';

export default class Flows extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flows: [],
            flowsFiltered: [],
            loading: true
        };
    }

    componentDidMount = () => {
        FlowSource.fetchAll().then(response => {
            this.setState({
                flows: response,
                flowsFiltered: response,
                loading: false
            });
        });
    };

    onSearch = (e, { value }) => {
        const filtered = this.state.flows.filter(flow => flow.developerName.toLocaleLowerCase().includes(value.toLocaleLowerCase()));

        this.setState({
            flowsFiltered: filtered
        });
    };

    render() {
        const flows = this.state.flowsFiltered.map(flow => {
            return (
                <Card key={ flow.id.id }>
                    <Card.Content header={ flow.developerName } />
                    <Card.Content description={ flow.developerSummary || 'No summary' } />
                    <Card.Content extra>
                        <Icon name="user" /> <span>300 states</span>

                        <Link to={ "/flows/" + flow.id.id + "/graph" }>
                            <Button basic color="green" floated="right" size="tiny">
                            Open
                        </Button>
                        </Link>
                    </Card.Content>
                </Card>
            )
        });

        return (
            <FlexComponent>
                <Header as="h1">
                    Flows
                    <Header.Subheader>Some description here about what flows are</Header.Subheader>
                </Header>

                <Form>
                    <Form.Group>
                        <Form.Input width="8" placeholder="Search" fluid onChange={ this.onSearch } />

                        <Form.Button width="8" floated="right" color="green" content="New Flow" icon="add circle" labelPosition="left" />
                    </Form.Group>
                </Form>

                <Loadable loading={ this.state.loading }>
                    <Card.Group itemsPerRow={ 3 }>
                        { flows }
                    </Card.Group>
                </Loadable>
            </FlexComponent>
        );
    }
}