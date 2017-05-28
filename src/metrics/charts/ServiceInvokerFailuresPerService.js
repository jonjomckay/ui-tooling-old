import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChartMetric from './ChartMetric';

class ServiceInvokerFailuresPerService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const endpoint = '/services/failures/top?limit=10';

        this.setState({
            endpoint: endpoint,
            from: nextProps.from,
            to: nextProps.to
        })
    };

    render() {
        return (
            <ChartMetric endpoint={ this.state.endpoint } from={ this.props.from } title="Service Failures per service" to={ this.props.to } token={ this.props.token } type="pie" />
        );
    }
}

ServiceInvokerFailuresPerService.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
};

export default ServiceInvokerFailuresPerService;