import React, { Component } from 'react'

const URL = 'ws://localhost:3030'

class ChatLogin extends Component {

    state = {
        fields: {},
        errors: {},
        nickname: ''
    }

    ws = new WebSocket(URL);

    componentDidMount() {
        let menu = document.getElementsByClassName('vertical-menu')
        menu[0].setAttribute('style', 'display: none')

        this.ws.onopen = () => {
            console.log('Conectado!');
        }

        this.ws.onclose = () => {
            console.log('Desconectado!');
            this.setState({ ws: new WebSocket(URL) })
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["nickname"]) {
            formIsValid = false;
            errors["nickname"] = "Campo não pode ser vazio.";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ nickname: e.target.value, fields })
    }

    handleLogin(context, e) {
        e.preventDefault()
        if (this.handleValidation()) {
            const messagePayload = { nickname: this.state.nickname, login: true }
            this.ws.send(JSON.stringify(messagePayload))
            this.props.history.push(`/chat/${this.state.nickname}`)
        }
    }

    render() {
        return (
            <form>
                <input
                    type='text'
                    placeholder={'Digite aqui...'}
                    value={this.state.nickname}
                    onChange={this.handleChange.bind(this, "nickname")}
                />
                <button onClick={e => this.handleLogin(this, e)}>Logar</button><br />
                <span style={{ color: "red" }}>{this.state.errors["nickname"]}</span>
            </form>
        )
    }
}

export default ChatLogin