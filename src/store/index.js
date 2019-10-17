import { createStore } from 'redux'

const INITIAL_STATE = []

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'USER_LOGGED') {
        state.push(action.nickname)
    }
    
    return state;
}

const store = createStore(reducer)

export default store