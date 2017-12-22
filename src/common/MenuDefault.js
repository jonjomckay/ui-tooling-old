import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

import { logout } from '../users/UserActions';
import TenantSwitcher from "../tenant/TenantSwitcher";

const MenuLink = ({ to, children }) => (
    <NavLink className="item nav-link" to={ to }>
        { children }
    </NavLink>
);

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
                    <NavLink to="/" className="nav-link">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/flows" className="nav-link">Flows</NavLink>
                </Menu.Item>
                <Dropdown item text="Elements">
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <NavLink to="/elements/pages" className="nav-link">Pages</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/elements/services" className="nav-link">Services</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/elements/types" className="nav-link">Types</NavLink>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <NavLink to="/elements/values" className="nav-link">Values</NavLink>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>
                    <NavLink to="/metrics" className="nav-link">Metrics</NavLink>
                </Menu.Item>
                <MenuLink to="/tenant" className="nav-link">Tenant</MenuLink>
                <Menu.Item>
                    <NavLink to="/players" className="nav-link">Players</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/users" className="nav-link">Users</NavLink>
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
