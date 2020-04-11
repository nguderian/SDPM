import { createStore, applyMiddleware, compose } from 'redux';
import AuthReducer from './reducers/auth/AuthReducer';
import thunk from 'redux-thunk';


var composedObjects = compose(
    applyMiddleware(thunk),
);

export default createStore(
    AuthReducer,
    compose(
        applyMiddleware(thunk),
        composedObjects
    )
);

