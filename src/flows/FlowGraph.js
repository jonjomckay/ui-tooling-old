import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Button, Header, Menu, Modal, Rail } from 'semantic-ui-react';
import Dracula from 'graphdracula';
import FlowGraphLayout from './FlowGraphLayout';
import FlowGraphRenderer from './FlowGraphRenderer';
import FlowGraphSource from './FlowGraphSource';
import ElementMenuItem from './elements/ElementMenuItem';
import ElementModal from "./elements/ElementModal";

export default class FlowGraph extends Component {
    element = null;
    renderer = null;

    static contextTypes = { router: PropTypes.object };

    constructor(props) {
        super(props);

        this.state = {
            editingToken: '',
            elementModalOpen: false,
            elementModalType: '',
            elementX: 0,
            elementY: 0,
            id: '',
            mapElements: [],
            viewportHeight: 0,
            viewportWidth: 0
        };
    }

    componentDidMount = () => {
        this.fetchGraph();

        window.addEventListener('resize', this.updateViewportDimensions);
    };

    fetchGraph = () => {
        FlowGraphSource.fetch(this.props.match.params.id).then(response => {
            this.props.onOpen(response);

            this.setState({
                editingToken: response.editingToken,
                id: response.id.id,
                mapElements: response.mapElements
            });
        });

        this.updateViewportDimensions();
    };

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateViewportDimensions);
    };

    onDragAdd = (type, x, y) => {
        const elements = this.state.mapElements;

        // Display the appropriate modal for the element

        // Save the element

        // elements.push({
        //     developerName: 'New Element',
        //     elementType: type,
        //     x: x,
        //     y: y
        // });

        this.setState({
            elementModalOpen: true,
            elementModalType: type,
            elementX: x,
            elementY: y,
            mapElements: elements
        })
    };

    updateViewportDimensions = () => {
        if (this.element) {
            console.log(document.documentElement.clientHeight);

            this.setState({
                viewportHeight: document.documentElement.clientHeight - 70,
                viewportWidth: document.documentElement.clientWidth
            });
        }
    };

    render() {
        const graph = new Dracula.Graph();

        this.state.mapElements
            .forEach(element => {
                graph.addNode(element.id, {
                    elementType: element.elementType.toLowerCase(),
                    label: element.developerName,
                    layoutPosX: element.x,
                    layoutPosY: element.y
                });
            });

        this.state.mapElements
            .forEach(element => {
                if (element.outcomes) {
                    element.outcomes.forEach(outcome => {
                        graph.addEdge(element.id, outcome.nextMapElementId, {
                            label: outcome.developerName,
                            style: {
                                label: outcome.developerName,
                                stroke: '#6482b9'
                            }
                        });
                    });
                }
            });

        new FlowGraphLayout(graph);

        if (this.element) {

            if (this.renderer === null) {
                this.renderer = new FlowGraphRenderer('#' + this.element.id);
                this.renderer.renderGraph(graph, 500, 300);
            } else {
                this.renderer.renderGraph(graph, this.state.viewportWidth, this.state.viewportHeight);
            }

        }

        const elementLabels = [
            {
                name: 'Step',
                icon: 'map pin',
                type: 'step'
            },
            {
                name: 'Page',
                icon: 'grid layout',
                type: 'page'
            },
            {
                name: 'Decision',
                icon: 'checkmark',
                type: 'decision'
            },
            {
                name: 'Operator',
                icon: 'setting',
                type: 'operator'
            },
            {
                name: 'Message',
                icon: 'envelope',
                type: 'message'
            },
            {
                name: 'Database Load',
                icon: 'arrow circle outline up',
                type: 'database.load'
            },
            {
                name: 'Database Save',
                icon: 'arrow circle outline down',
                type: 'database.save'
            },
            {
                name: 'Database Delete',
                icon: 'remove circle outline',
                type: 'database.delete'
            },
            {
                name: 'Swimlane',
                icon: 'users',
                type: 'swimlane'
            },
        ];

        const elements = elementLabels.map(label => {
            return (
                <ElementMenuItem
                    icon={ label.icon }
                    key={ label.name }
                    onDragAdd={ this.onDragAdd }
                    text={ label.name }
                    type={ label.type } />
            )
        });

        return (
            <div style={{ position: 'relative' }}>
                <DragDropContextProvider backend={ HTML5Backend }>
                    <div>
                        <ElementModal
                            editingToken={ this.state.editingToken }
                            flow={ this.state.id }
                            isOpen={ this.state.elementModalOpen }
                            onSave={ this.fetchGraph }
                            type={ this.state.elementModalType }
                            x={ this.state.elementX }
                            y={ this.state.elementY } />


                        <Rail internal position="left" style={{ marginLeft: 0, paddingLeft: 0 }}>
                            <Menu icon="labeled" vertical style={{ position: 'relative', zIndex: 100 }}>
                                { elements }
                            </Menu>
                        </Rail>

                        <div id="graph" ref={ element => { this.element = element }}>
                        </div>
                    </div>
                </DragDropContextProvider>
            </div>
        );
    }
}