import React, { Component } from 'react'

import './styles.css'

const URL = 'ws://localhost:3030'

class ChatMenuUsers extends Component {

    state = {
        users: []
    }

    ws = new WebSocket(URL);

    componentDidMount() {

        this.ws.onopen = () => {
            console.log('Conectado!');
        }

        this.ws.onclose = () => {
            console.log('Desconectado!');
            this.setState({ ws: new WebSocket(URL) })
        }

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            if (message.nickname && this.state.users.indexOf(message.nickname) <= -1)
                this.setState(state => ({ users: [message.nickname, ...state.users] }));

            if (this.state.users.indexOf(message.nickname) >= 0 && message.remove) {
                let users = this.state.users
                const newsUsers = users.splice(users.indexOf(message.nickname)-1, 1)
                this.setState({ users: newsUsers });
            }
        }
    }

    render() {
        return (
            <div className="vertical-menu">
                <a className="active">Usuários logados</a>
                {this.state.users.map((user, index) =>
                    <a key={index}>{user}</a>
                )}
            </div>
        )
    }
}

export default ChatMenuUsers