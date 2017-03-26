import React, { Component } from 'react';
import ChartMetric from './ChartMetric';

class ServiceInvokerRequestsPerMonth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const endpoint = '/services/requests/monthly';

        this.setState({
            endpoint: endpoint,
            from: nextProps.from,
            to: nextProps.to
        })
    };

    render() {
        return (
          <ChartMetric endpoint={ this.state.endpoint } from={ this.props.from } title="Service Requests per month" to={ this.props.to } token={ this.props.token } type="line" />
        );
    }
}

ServiceInvokerRequestsPerMonth.propTypes = {
    from: React.PropTypes.object.isRequired,
    to: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired
};

export default ServiceInvokerRequestsPerMonth;