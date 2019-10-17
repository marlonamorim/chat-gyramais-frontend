import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired
    }
    state = {
        message: ''
    }

    render() {
        return (
            <form
                action='.'
                onSubmit={e => {
                    e.preventDefault()
                    this.props.onSubmitMessage(this.state.message)
                    this.setState({ message: '' })
                }}
            >
                <input
                    type='text'
                    placeholder={'Digite aqui...'}
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <input type='submit' value='Enviar'/>
            </form>
        )
    }
}

export default ChatInput