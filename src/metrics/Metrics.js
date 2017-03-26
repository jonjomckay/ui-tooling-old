import React, { Component } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import moment from 'moment';
import DatePicker from '../common/DatePicker';
import ServiceInvokerFailuresPerMonth from './charts/ServiceInvokerFailuresPerMonth';
import ServiceInvokerFailuresPerService from './charts/ServiceInvokerFailuresPerService';
import ServiceInvokerRequestsPerMonth from './charts/ServiceInvokerRequestsPerMonth';
import ServiceInvokerRequestsPerService from './charts/ServiceInvokerRequestsPerService';
import StatesCreatedPerDay from './charts/StatesCreatedPerDay';
import StatesCreatedPerMonth from './charts/StatesCreatedPerMonth';

export default class Metrics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateFrom: moment(),
            dateTo: moment()
        };
    }

    componentDidMount = () => {
        this.onClickLast6Months();
    };

    onClickLast24Hours = () => {
        this.setState({
            dateFrom: moment().subtract(24, 'hours'),
            dateTo: moment()
        })
    };

    onClickLastWeek = () => {
        this.setState({
            dateFrom: moment().subtract(1, 'weeks'),
            dateTo: moment()
        })
    };

    onClickLast30Days = () => {
        this.setState({
            dateFrom: moment().subtract(30, 'days'),
            dateTo: moment()
        })
    };

    onClickLast6Months = () => {
        this.setState({
            dateFrom: moment().subtract(6, 'months'),
            dateTo: moment()
        })
    };

    onChangeFrom = (value) => {
        this.setState({
            dateFrom: value
        });
    };

    onChangeTo = (value) => {
        this.setState({
            dateTo: value
        });
    };

    render() {
        const calendarConfig = { type: 'date', selector: { activator: '.ui.labeled.input' } };
        
        const token = process.env.REACT_APP_TOKEN;

        const dateFrom = this.state.dateFrom;
        const dateTo = this.state.dateTo;

        return (
            <div>
                <Header as="h1">
                    Metrics
                    <Header.Subheader>Some description here about what metrics are</Header.Subheader>
                </Header>

                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <DatePicker calendarConfig={ calendarConfig } label="From" onChange={ this.onChangeFrom } value={ this.state.dateFrom.toISOString() } />
                        <DatePicker calendarConfig={ calendarConfig } label="To" onChange={ this.onChangeTo } value={ this.state.dateTo.toISOString() } />

                        <Button.Group floated="right">
                            <Button onClick={ this.onClickLast24Hours }>Last 24 Hours</Button>
                            <Button onClick={ this.onClickLastWeek }>Last Week</Button>
                            <Button onClick={ this.onClickLast30Days }>Last 30 Days</Button>
                            <Button onClick={ this.onClickLast6Months }>Last 6 Months</Button>
                        </Button.Group>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={ 3 }>
                        <Grid.Column>
                            <StatesCreatedPerMonth token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                        <Grid.Column>
                            <ServiceInvokerFailuresPerMonth token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                        <Grid.Column>
                            <ServiceInvokerRequestsPerMonth token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <StatesCreatedPerDay token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row columns={ 2 }>
                        <Grid.Column>
                            <ServiceInvokerRequestsPerService token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                        <Grid.Column>
                            <ServiceInvokerFailuresPerService token={ token } from={ dateFrom } to={ dateTo } />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}