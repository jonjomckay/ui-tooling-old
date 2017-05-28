import PropTypes from 'prop-types';
import React, { Component } from "react";
import ChartMetric from './ChartMetric';

class StatesCreatedPerDay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        const endpoint = '/states/created/daily';

        this.setState({
            endpoint: endpoint,
            from: nextProps.from,
            to: nextProps.to
        })
    };

    render() {
        return (
          <ChartMetric endpoint={ this.state.endpoint } from={ this.props.from } title="States created per Day" to={ this.props.to } token={ this.props.token } type="line" width={this.props.width} height={this.props.height} />
        );
    }
}

StatesCreatedPerDay.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
};

export default StatesCreatedPerDay;