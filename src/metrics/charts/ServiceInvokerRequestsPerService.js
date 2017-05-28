import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Message, Table } from 'semantic-ui-react';
import MetricsSource from '../MetricsSource';
import Loadable from '../../Loadable';

class ServiceInvokerRequestsPerService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: false,
            response: []
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: true
        });

        const endpoint = '/services/requests/top?limit=10&from=' + nextProps.from.format('YYYY-MM-DD') + '&to=' + nextProps.to.format('YYYY-MM-DD');

        MetricsSource.get(nextProps.token, endpoint).then(response => {
              this.setState({
                  error: null,
                  loading: false,
                  response: response
              });
          }).catch(this.onError);
    };

    onError = (error) => {
        this.setState({
            error: error.message,
            loading: false
        });
    };

    render() {
        let results;

        if (this.state.error) {
            results = (
                <Message error>An error occurred while loading data: { this.state.error }</Message>
            )
        }
        else if (this.state.response.length) {
            const endpoints = this.state.response.map(endpoint => {
                return (
                    <Table.Row key={ endpoint.name }>
                        <Table.Cell>{ endpoint.name }</Table.Cell>
                        <Table.Cell>{ endpoint.value }</Table.Cell>
                    </Table.Row>
                );
            });

            results = (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { endpoints }
                    </Table.Body>
                </Table>
            );
        }
        else {
            results = (
                <Message info>No data available for the given period</Message>
            )
        }

        return (
          <div>
              <h4>Service Requests per service</h4>

              <Loadable loading={ this.state.loading }>
                  { results }
              </Loadable>
          </div>
        );
    }
}

ServiceInvokerRequestsPerService.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
};

export default ServiceInvokerRequestsPerService;