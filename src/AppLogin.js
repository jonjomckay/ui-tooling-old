import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Form, Grid, Header, Image, Input, Segment } from 'semantic-ui-react';
import moment from 'moment';

import logo from './logo.png';
import './AppLogin.css';
import { setToken } from './users/UserActions';

class AppLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isLoadingTenants: false,
            isLoadingPreToken: false,
            isLoadingToken: false,
            password: '',
            preToken: '',
            selectedTenant: '',
            tenants: []
        };
    }

    onChangeEmail = (e, { value }) => {
        this.setState({
            email: value
        });
    };

    onChangePassword = (e, { value }) => {
        this.setState({
            password: value
        });
    };

    onChooseTenant = (e, { value }) => {
        e.preventDefault();

        this.setState({
            selectedTenant: value
        });
    };

    onLogin = (e) => {
        e.preventDefault();

        const request = {
            headers: {
                'Authorization': this.state.preToken
            }
        };

        this.setState({
            isLoadingToken: true
        });

        fetch('https://staging.manywho.com/api/draw/1/authentication/' + this.state.selectedTenant, request)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    isLoadingToken: false
                });

                this.props.onLogin(response);
            });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const request = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        };

        this.setState({
            isLoadingPreToken: true
        });

        fetch('https://staging.manywho.com/api/draw/1/authentication', request)
            .then(response => response.json())
            .then(response => {
                // TODO: Check the response is valid

                this.setState({
                    isLoadingTenants: true,
                    isLoadingPreToken: false,
                    preToken: response
                });

                const request = {
                    headers: {
                        'Authorization': response
                    }
                };

                fetch('https://staging.manywho.com/api/admin/1/users/me', request)
                    .then(response => response.json())
                    .then(response => {
                        this.setState({
                            tenants: response.tenants,
                            isLoadingTenants: false
                        });
                    });
            });
    };

    render() {
        let actions;

        if (this.state.isLoadingTenants || this.state.tenants.length) {
            const options = this.state.tenants.map(tenant => {
                let lastLoggedIn;

                if (tenant.lastLoggedInAt) {
                    lastLoggedIn = 'Last logged in ' + moment(tenant.lastLoggedInAt).fromNow();
                } else {
                    lastLoggedIn = ' ';
                }

                return {
                    content: <Header as="h4" content={ tenant.developerName } subheader={ lastLoggedIn } />,
                    key: tenant.id,
                    text: tenant.developerName,
                    value: tenant.id
                };
            });

            actions = (
                <div>
                    <Form.Field>
                        <Dropdown fluid search selection
                                  loading={ this.state.isLoadingTenants }
                                  onChange={ this.onChooseTenant }
                                  options={ options }
                                  placeholder="Choose a tenant" />
                    </Form.Field>

                    <Form.Field>
                        <Button fluid className="manywho" loading={ this.state.isLoadingToken } onClick={ this.onLogin } size="large">
                            Login
                        </Button>
                    </Form.Field>
                </div>
            )
        } else {
            actions = (
                <Button fluid className="manywho" loading={ this.state.isLoadingPreToken } onClick={ this.onSubmit } size="large">
                    Choose Tenant
                </Button>
            )
        }

        return (
            <Grid className="login" verticalAlign="middle" textAlign="center">
                <Grid.Column>
                    <Header as="h2" className="image manywho">
                        <Image src={ logo } />

                        Login to ManyWho
                    </Header>

                    <Form size="large">
                        <Segment basic>
                            <Form.Field>
                                <Input disabled={ !!this.state.tenants.length } icon="user" iconPosition="left" onChange={ this.onChangeEmail } placeholder="Email address" type="email" />
                            </Form.Field>

                            <Form.Field>
                                <Input disabled={ !!this.state.tenants.length } icon="lock" iconPosition="left" onChange={ this.onChangePassword } placeholder="Password" type="password" />
                            </Form.Field>

                            { actions }
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.token
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin: (token) => {
        dispatch(setToken(token))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);