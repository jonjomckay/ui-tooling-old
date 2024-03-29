import PropTypes from 'prop-types';
import React, { Component } from "react";
import ChartMetric from './ChartMetric';

class StatesCreatedPerWeek extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const endpoint = '/states/created/weekly';

        this.setState({
            endpoint: endpoint,
            from: nextProps.from,
            to: nextProps.to
        })
    };

    render() {
        return (
          <ChartMetric endpoint={ this.state.endpoint } from={ this.props.from } title="States created per Week" to={ this.props.to } token={ this.props.token } type="bar" />
        );
    }
}

StatesCreatedPerWeek.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired
};

export default StatesCreatedPerWeek;