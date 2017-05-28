import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import Flows from './flows/Flows';
import FlowGraph from './flows/FlowGraph';
import Dashboard from './dashboard/Dashboard';
import MenuDefault from './common/MenuDefault';
import MenuGraph from './common/MenuGraph';
import Metrics from './metrics/Metrics';
import Players from './players/Players';
import Tenant from './tenant/Tenant';
import Values from './values/Values';
import Users from './users/Users';

export default class AppTooling extends Component {
    static contextTypes = { router: PropTypes.object };

    constructor(props) {
        super(props);

        this.state = {
            flow: {
                developerName: ''
            }
        }
    }

    onFlowGraphOpen = (flow) => {
        this.setState({
            flow: flow
        });
    };

    render() {
        // This is very weak matching - need to figure out how to get react-router to give the actual current route
        const isGraph = this.context.router.route.location.pathname.endsWith('/graph');

        let menu;
        if (isGraph) {
            menu = <MenuGraph flow={ this.state.flow } />;
        } else {
            menu = <MenuDefault />;
        }

        const flowGraphComponent = (props) => {
            return (
                <FlowGraph onOpen={ this.onFlowGraphOpen } { ...props } />
            );
        };

        return (
            <div className="app height-100">
                <Menu borderless className="main" fixed="top">
                    <Container fluid={ isGraph }>
                        { menu }
                    </Container>
                </Menu>

                <Container className="main content height-100" fluid={ isGraph }>
                    <Route path="/" exact component={ Dashboard } />
                    <Route path="/elements/values" component={ Values } />
                    <Route path="/flows" exact component={ Flows } />
                    <Route path="/flows/:id/graph" render={ flowGraphComponent } />
                    <Route path="/metrics" component={ Metrics } />
                    <Route path="/players" component={ Players } />
                    <Route path="/tenant" component={ Tenant } />
                    <Route path="/users" component={ Users } />
                </Container>
            </div>
        );
    }
}