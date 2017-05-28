import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

import { logout } from '../users/UserActions';
import TenantSwitcher from "../tenant/TenantSwitcher";

class MenuDefault extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTenantSwitcherOpen: false
        };
    }

    onClickSwitchTenant = () => {
        this.setState({
            isTenantSwitcherOpen: true
        });
    };

    render() {
        return (
            <Container fluid>
                <Menu.Item header>ManyWho</Menu.Item>
                <Menu.Item>
                    <Link to="/" className="nav-link">Dashboard</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/flows" className="nav-link">Flows</Link>
                </Menu.Item>
                <Dropdown item text="Elements">
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/elements/pages" className="nav-link">Pages</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/elements/services" className="nav-link">Services</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/elements/types" className="nav-link">Types</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/elements/values" className="nav-link">Values</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>
                    <Link to="/metrics" className="nav-link">Metrics</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/tenant" className="nav-link">Tenant</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/players" className="nav-link">Players</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/users" className="nav-link">Users</Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Dropdown item text="Jonjo McKay">
                        <Dropdown.Menu>
                            <Dropdown.Header content="User" />
                            <Menu.Item>Edit profile</Menu.Item>

                            <Dropdown.Divider />

                            <Dropdown.Header content="Tenant" />
                            <TenantSwitcher />

                            <Dropdown.Divider />

                            <Dropdown.Item onClick={ this.props.onLogout }>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => {
        dispatch(logout())
    }
});

export default connect(null, mapDispatchToProps)(MenuDefault);
