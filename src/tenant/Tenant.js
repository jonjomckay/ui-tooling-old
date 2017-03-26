import React, { Component } from 'react';
import { Form, Header, Input } from 'semantic-ui-react';
import update from 'immutability-helper';
import TenantSource from './TenantSource';
import TenantIPRestrictionTable from './TenantIPRestrictionTable';
import Loadable from '../Loadable';

export default class Tenant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            tenant: {
                developerName: '',
                developerSummary: '',
                securitySettings: {
                    authorizedAdminIPRanges: [],
                    authorizedDrawIPRanges: [],
                    authorizedPackagingIPRanges: [],
                    authorizedRunIPRanges: [],
                    authorizedServiceRemoteSites: [],
                    isAdminRestrictedByIPRange: false,
                    isDrawRestrictedByIPRange: false,
                    isPackagingRestrictedByIPRange: false,
                    isRunRestrictedByIPRange: false,
                    isServiceRestrictedByRemoteSites: false
                }
            }
        };
    }

    componentDidMount = () => {
        TenantSource.fetch().then(response => {
            this.setState({
                loading: false,
                tenant: response
            });
        });
    };


    onAddRestrictionForAdminAPI = (restriction) => {
        this.updateRestrictions('authorizedAdminIPRanges', restriction)
    };

    onAddRestrictionForDrawAPI = (restriction) => {
        this.updateRestrictions('authorizedDrawIPRanges', restriction);
    };

    onAddRestrictionForPackagingAPI = (restriction) => {
        this.updateRestrictions('authorizedPackagingIPRanges', restriction);
    };

    onAddRestrictionForRunAPI = (restriction) => {
        this.updateRestrictions('authorizedRunIPRanges', restriction);
    };

    updateRestrictions = (type, restriction) => {
        const newRestrictions = update(this.state.tenant.securitySettings[type] || [], {
            $push: [{
                developerName: restriction.name,
                endIPAddress: restriction.endIpAddress,
                startIPAddress: restriction.startIpAddress
            }]
        });

        this.setState(update(this.state, {
            tenant: {
                securitySettings: {
                    [type]: {
                        $set: newRestrictions
                    }
                }
            }
        }));
    };


    onToggleRestrictionsForAdminAPI = () => {
        this.toggleRestrictions('isAdminRestrictedByIPRange');
    };

    onToggleRestrictionsForDrawAPI = () => {
        this.toggleRestrictions('isDrawRestrictedByIPRange');
    };

    onToggleRestrictionsForPackagingAPI = () => {
        this.toggleRestrictions('isPackagingRestrictedByIPRange');
    };

    onToggleRestrictionsForRunAPI = () => {
        this.toggleRestrictions('isRunRestrictedByIPRange');
    };

    toggleRestrictions = (type) => {
        this.setState(update(this.state, {
            tenant: {
                securitySettings: {
                    $merge: {
                        [type]: !this.state.tenant.securitySettings[type]
                    }
                }
            }
        }));
    };

    render() {
        const tenant = this.state.tenant;
        const securitySettings = tenant.securitySettings;

        return (
            <Loadable loading={ this.state.loading }>
                <Header as="h2">
                    <Header.Content>
                        { tenant.developerName }

                        <Header.Subheader>
                            { tenant.developerSummary }
                        </Header.Subheader>
                    </Header.Content>
                </Header>

                <Form>
                    <Header as="h3">Security</Header>

                    <Header as="h4">Admin API</Header>
                    <Form.Checkbox label="Enable IP address restrictions for the Admin API?" checked={ securitySettings.isAdminRestrictedByIPRange } onChange={ this.onToggleRestrictionsForAdminAPI } />

                    <TenantIPRestrictionTable
                        enabled={ securitySettings.isAdminRestrictedByIPRange }
                        onAdd={ this.onAddRestrictionForAdminAPI }
                        restrictions={ securitySettings.authorizedAdminIPRanges } />

                    <Header as="h4">Draw API</Header>
                    <Form.Checkbox label="Enable IP address restrictions for the Draw API?" checked={ securitySettings.isDrawRestrictedByIPRange } onChange={ this.onToggleRestrictionsForDrawAPI } />

                    <TenantIPRestrictionTable
                        enabled={ securitySettings.isDrawRestrictedByIPRange }
                        onAdd={ this.onAddRestrictionForDrawAPI }
                        restrictions={ securitySettings.authorizedDrawIPRanges } />

                    <Header as="h4">Packaging API</Header>
                    <Form.Checkbox label="Enable IP address restrictions for the Packaging API?" checked={ securitySettings.isPackagingRestrictedByIPRange } onChange={ this.onToggleRestrictionsForPackagingAPI } />

                    <TenantIPRestrictionTable
                        enabled={ securitySettings.isPackagingRestrictedByIPRange }
                        onAdd={ this.onAddRestrictionForPackagingAPI }
                        restrictions={ securitySettings.authorizedPackagingIPRanges } />

                    <Header as="h4">Run API</Header>
                    <Form.Checkbox label="Enable IP address restrictions for the Run API?" checked={ securitySettings.isRunRestrictedByIPRange } onChange={ this.onToggleRestrictionsForRunAPI } />

                    <TenantIPRestrictionTable
                        enabled={ securitySettings.isRunRestrictedByIPRange }
                        onAdd={ this.onAddRestrictionForRunAPI }
                        restrictions={ securitySettings.authorizedRunIPRanges } />

                    <Header as="h4">Services</Header>
                    <Form.Checkbox label="Enable Service endpoint restrictions?" />

                    <Header as="h3">Reporting</Header>

                    <Form.Field inline>
                        <label>Endpoint</label>
                        <Input placeholder="https://example.com/api/reporting/1" />
                    </Form.Field>

                    <Header as="h3">Settings</Header>

                    <Form.Checkbox label="Enable server-side formatting of Values?" />
                </Form>
            </Loadable>
        );
    }
}