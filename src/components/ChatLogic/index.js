import React, { Component } from 'react'

import ChatInput from '../ChatInput'
import ChatMessage from '../ChatMessage'

const URL = 'ws://localhost:3030'

class ChatLogic extends Component {
    state = {
        name: this.props.match.params.nickname,
        messages: []
    }

    ws = new WebSocket(URL);

    componentDidMount() {
        let menu = document.getElementsByClassName('vertical-menu')
        menu[0].setAttribute('style', 'display: block')

        this.ws.onopen = () => {
            console.log('Conectado!');
        }

        this.ws.onclose = () => {
            console.log('Desconectado!');
            this.setState({ ws: new WebSocket(URL) })
        }

        this.ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            if (!message.login && !message.logoff)
                this.addMessage(message)
        }

    }

    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }))

    submitMessage = messageValue => {
        const messagePayload = { nickname: this.state.name, message: messageValue }
        this.ws.send(JSON.stringify(messagePayload))
        this.addMessage(messagePayload)
    }

    handleLogoff = () => {
        const messagePayload = { nickname: this.state.name, logoff: true, remove: true }
        this.ws.send(JSON.stringify(messagePayload))
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <label>
                    Nickname:&nbsp;
                    {this.state.name}
                </label>
                <ChatInput
                    onSubmitMessage={messageValue => this.submitMessage(messageValue)}
                /><br></br>
                <button onClick={e => { e.preventDefault(); this.handleLogoff() }}>Logoff</button>
                {this.state.messages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.nickname}
                    />
                )}
            </div>
        )
    }
}

export default ChatLogic