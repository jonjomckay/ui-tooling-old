import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class Loadable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading
        });
    };

    render() {
        return (
            <Segment basic className="flex">
                <Dimmer active={ this.state.loading } inverted>
                    <Loader inverted inline="center">Loading</Loader>
                </Dimmer>

                { this.props.children }
            </Segment>
        );
    }
}

Loadable.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loadable;