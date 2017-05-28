import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import URI from 'urijs';
import Loadable from '../../Loadable';
import MetricsSource from '../MetricsSource';
import ChartHelper from './ChartHelper';

class ChartMetric extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: false,
            data: {
                labels: [],
                datasets: []
            }
        }
    }

    onError = (error) => {
        this.setState({
            error: error.message,
            loading: false
        });
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: true
        });

        const endpoint = new URI(nextProps.endpoint)
            .addQuery('from', nextProps.from.format('YYYY-MM-DD'))
            .addQuery('to', nextProps.to.format('YYYY-MM-DD'));

        MetricsSource.get(nextProps.token, endpoint).then(response => {
            // Group all the data points by the tenant ID
            const tenantGroups = response.reduce((groups, item) => {
                (groups[item.tenant] = groups[item.tenant] || []).push(item);

                return groups;
            }, {});

            // Get all the unique labels (names)
            const labels = response.map(item => item.name);

            // Map all the grouped data points to the expected format
            const data = Object.keys(tenantGroups).map((tenant) => {
                const group = tenantGroups[tenant];

                return {
                    tenant: tenant,
                    points: group.map(function (point) {
                        return point.value;
                    })
                }
            });

            this.setState({
                error: null,
                loading: false,
                data: ChartHelper.createData(nextProps.type, labels, data)
            });
        }).catch(this.onError);
    };

    render() {
        let chart;

        if (this.state.error) {
            chart = (
                <Message error>An error occurred while loading data: { this.state.error }</Message>
            )
        }
        else if (this.state.data.datasets.length) {
            switch (this.props.type) {
                case 'bar':
                    chart = <Bar data={ this.state.data } options={{ responsive: true, legend: { display: false }, maintainAspectRatio: false }} />;
                    break;
                case 'line':
                    chart = <Line data={ this.state.data } options={{ responsive: true, legend: { display: false }, maintainAspectRatio: false }} />;
                    break;
                case 'pie':
                    chart = <Pie data={ this.state.data } options={{ responsive: true, legend: { display: true, position: 'right' }, maintainAspectRatio: false }} />;
                    break;
                default:
                    console.log('An unsupported chart type of "' + this.props.type + '" was given');
            }
        }
        else {
            chart = (
                <Message info>No data available for the given period</Message>
            )
        }

        return (
            <div>
                <h4>{ this.props.title }</h4>

                <Loadable loading={ this.state.loading }>
                    { chart }
                </Loadable>
            </div>
        );
    }
}

ChartMetric.propTypes = {
    endpoint: PropTypes.string.isRequired,
    from: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bar', 'line', 'pie']).isRequired,
};

export default ChartMetric;