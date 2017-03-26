import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';

export default class MenuGraph extends Component {
    render() {
        return (
            <Container fluid>
                <Menu.Item header>{ this.props.flow.developerName }</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button content="Properties" icon="settings" />
                    </Menu.Item>
                    <Menu.Item>
                        <Button content="Navigation" icon="sitemap" />
                    </Menu.Item>

                    <Menu.Item>
                        <Button color="green" content="Run" icon="play" />
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="blue" content="Publish" icon="send" />
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="yellow" content="Export" icon="cloud download" />
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/flows">
                            <Icon name="arrow left" /> Back to Flows
                        </Link>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        );
    }
}