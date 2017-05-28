import PropTypes from 'prop-types';
import React, { Component } from "react";
import ChartMetric from './ChartMetric';

class StatesCreatedPerMonth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const endpoint = '/states/created/monthly';

        this.setState({
            endpoint: endpoint,
            from: nextProps.from,
            to: nextProps.to
        })
    };

    render() {
        return (
          <ChartMetric endpoint={ this.state.endpoint } from={ this.props.from } title="States created per Month" to={ this.props.to } token={ this.props.token } type="line" />
        );
    }
}

StatesCreatedPerMonth.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
};

export default StatesCreatedPerMonth;