import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Icon, Menu } from 'semantic-ui-react';

const elementMenuItem = {
    beginDrag(props) {
        return {
            type: props.type
        };
    },

    endDrag(props, monitor) {
        const { x, y } = monitor.getClientOffset();

        // Adding these offsets is a hack - need to find out how to get the real offset of the graph including margin, etc.
        props.onDragAdd(props.type, x - 175, y + 150);
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class ElementMenuItem extends Component {
    render() {
        return this.props.connectDragSource(
            <div>
                <Menu.Item key={ this.props.text } name={ this.props.text }>
                    <Icon name={ this.props.icon } /> { this.props.text }
                </Menu.Item>
            </div>
        );
    }
}

ElementMenuItem.propTypes = {
    icon: PropTypes.string.isRequired,
    onDragAdd: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource('elementMenuItem', elementMenuItem, collect)(ElementMenuItem);