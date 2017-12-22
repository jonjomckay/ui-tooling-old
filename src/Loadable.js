import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

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
        const content = this.state.loading ? '' : this.props.children;

        return (
            <div className="flex">
                <Dimmer active={ this.state.loading } inverted>
                    <Loader inline inverted>Loading</Loader>
                </Dimmer>

                { content }
            </div>
        );
    }
}

Loadable.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Loadable;