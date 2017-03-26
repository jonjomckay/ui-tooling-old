import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu } from 'semantic-ui-react';

export default class MenuDefault extends Component {
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

                <Menu.Menu position="right">
                    <Dropdown item text="Jonjo McKay">
                        <Dropdown.Menu>
                            <Dropdown.Header content="Profile"/>
                            <Dropdown.Item>Edit profile</Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Header content="Switch tenant"/>
                            <Dropdown.Item>@servicebox+jonjomckay.com</Dropdown.Item>
                            <Dropdown.Item>@servicedemo+jonjomckay.com</Dropdown.Item>
                            <Dropdown.Item>@servicedummy+jonjomckay.com</Dropdown.Item>
                            <Dropdown.Item>@servicetwilio+jonjomckay.com</Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Container>
        );
    }
}