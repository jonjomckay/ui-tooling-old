import React, { Component } from 'react';
import { Form, Header } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import Loadable from '../Loadable';
import PlayerSource from '../players/PlayerSource';

import 'brace/mode/html';
import 'brace/theme/monokai';
import FlexComponent from "../common/FlexComponent";

export default class Players extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            playerContent: '',
            playerName: null,
            players: []
        };
    }


    componentDidMount = () => {
        PlayerSource.fetchAll().then(response => {
            this.setState({
                players: response
            });
        });
    };

    onChangePlayerContent = (content) => {
        this.setState({
            playerContent: content
        });
    };

    onSavePlayer = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        PlayerSource.save(this.state.playerName, this.state.playerContent).then(response => {
            this.setState({
                loading: false,
                playerContent: response
            })
        });
    };

    onSelectPlayer = (event, option) => {
        this.setState({
            loading: true
        });

        PlayerSource.fetch(option.value).then(response => {
            this.setState({
                loading: false,
                playerContent: response,
                playerName: option.value
            });
        });
    };

    render() {
        const disabled = !this.state.playerName;

        const options = this.state.players.map(player => {
            return {
                text: player,
                value: player
            };
        });

        return (
            <FlexComponent>
                <Header as="h1">
                    Players

                    <Header.Subheader>Some description here about what players are</Header.Subheader>
                </Header>

                <Form>
                    <Form.Group>
                        <Form.Select width="8" placeholder="Choose a player" fluid options={ options } onChange={ this.onSelectPlayer } />
                        <Form.Button width="2" fluid color="green">New</Form.Button>
                        <Form.Button width="2" fluid disabled={ disabled } color="blue" onClick={ this.onSavePlayer }>Save</Form.Button>
                        <Form.Button width="2" fluid disabled={ disabled } color="red">Delete</Form.Button>
                        <Form.Button width="2" fluid disabled={ disabled } color="yellow">Run Flow</Form.Button>
                    </Form.Group>
                </Form>

                <Loadable loading={ this.state.loading }>
                    <AceEditor mode="html" theme="monokai" onChange={ this.onChangePlayerContent } value={ this.state.playerContent } width="100%" editorProps={{ $blockScrolling: true }} />
                </Loadable>
            </FlexComponent>
        );
    }
}