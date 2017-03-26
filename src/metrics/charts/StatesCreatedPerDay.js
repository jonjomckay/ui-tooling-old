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
    from: React.PropTypes.object.isRequired,
    to: React.PropTypes.object.isRequired,
    token: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number
};

export default StatesCreatedPerDay;