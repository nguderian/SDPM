import { createStore, applyMiddleware, compose } from 'redux';
import AuthReducer from './reducers/auth/AuthReducer';
import thunk from 'redux-thunk';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    }
    catch (error) {
        console.log(error)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    }
    catch (error) {
        console.log(error)
        return undefined
    }
}

var composedObjects = compose(
    applyMiddleware(thunk),
);

const persistedState = loadFromLocalStorage();

const store = createStore(
    AuthReducer,
    persistedState,
    compose(
        applyMiddleware(thunk),
        composedObjects
    )
);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;