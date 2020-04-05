import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import currentUser from './storeConfig/reducers';
import * as serviceWorker from './serviceWorker';
import routes from './Routes'

// checks to see if there's data in local storage (browser)
// if there is it loads it to the store as initial state
// this makes it so that if you logged in and then refreshed the page
// you dont get logged out, later on as the store gets more complex
// we can add more to local storage but for now its just
// user_id,loggedIn boolean, token, and type
const initialState =  (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : ({
    userId: 5,
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg1ODc0Nzc4LCJleHAiOjE1ODg0NjY3Nzh9.ZcdtoPOcXqaVdfhMMERjDje-tBBS9ouwsVnsRWhsP_I',
    loggedIn: true,
    userType: 'student',
    ipAddress: '10.171.204.179'
})

const store = createStore(currentUser, initialState)

console.log(store.getState())

store.subscribe(() => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
})

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
