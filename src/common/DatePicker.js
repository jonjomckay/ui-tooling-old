import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import { Input } from 'semantic-ui-react';
import 'semantic-ui-calendar/dist/calendar.css';

// SUI calendar depends on SUI popup
$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

global.jQuery = $;

require('semantic-ui-calendar/dist/calendar');

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focus: false
        };
    }

    componentDidMount = () => {
        const { calendarConfig } = this.props;

        this.$container = $(ReactDOM.findDOMNode(this));

        this.$container.calendar({
            onChange: this.handleChange,
            ...calendarConfig
        });
    };

    componentWillReceiveProps = (nextProps) => {
        const { focus } = this.state;

        const { value: oldValue } = this.props;
        const { value: newValue } = nextProps;

        // While the input is focused, we assume any changes that coming from
        // outside were triggeded by SUI-Calendar, so ignore them. When the input
        // is not focused, use SUI-Calendar to set the input value based on the
        // new value prop.
        if (!focus && newValue !== oldValue) {
            this.$container.calendar(
                'set date',
                newValue ? moment(newValue).format() : undefined,
                true, // updateInput
                false // fireChange
            )
        }
    };

    componentWillUnmount = () => {
        if (this.$container) {
            this.$container.calendar('destroy');
        }
    };

    handleChange = (value) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(moment(value));
        }
    };

    handleInputFocus = () => {
        this.setState({ focus: true });
    };

    handleInputBlur = () => {
        this.setState({ focus: false });
    };

    render() {
        const inputProps = {
            ..._.omit(this.props, 'onChange', 'value', 'calendarConfig')
        };

        // NOTE: Given issues related to jQuery, making this controlled
        // component in the normal way (setting value of the input via React)
        // causes issues with manipulating the date via the input box. We use the
        // value or defaultValue prop to set the default value, and handle setting
        // the value via componentWillReceiveProps.
        const defaultValue = _.defaultTo(this.props.value, inputProps.defaultValue);

        if (defaultValue) {
            inputProps.defaultValue = moment(defaultValue).format()
        }

        return (
            <span className='ui calendar'>
                <Input
                    {...inputProps}
                    onBlur={this.handleInputBlur}
                    onFocus={this.handleInputFocus}
                />
            </span>
        )
    }
}

DatePicker.propTypes = {
    defaultValue: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    calendarConfig: React.PropTypes.object
};

export default DatePicker;