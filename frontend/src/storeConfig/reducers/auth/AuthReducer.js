import AuthActionTypes from '../../actions/auth/AuthActionTypes';

const initialState = {
    userId: '',
    token: '',
    loggedIn: false,
    userType: '',
    ipAddress: ''
};


function currentUser(state = initialState, action) {

    const handleOnLogin = (action) => {
        const newState = {...state};
        console.log('action.payload', action.payload);
        newState.userId = action.payload.userId;
        newState.token = action.payload.token;
        newState.loggedIn = action.payload.loggedIn;
        newState.userType = action.payload.userType;
        newState.ipAddress = action.payload.ipAddress;

        return newState;
    };

    const handleOnLogout = () => {
        state = initialState;
        return { ...state }
    };

    switch(action.type) {

        case AuthActionTypes.LOGIN_SUCCESS: 
            console.log('logging in', state);
            return handleOnLogin(action);
        
        case AuthActionTypes.ON_LOGOUT:
            console.log('logging out', state);
            return handleOnLogout();
        
        // default 
        default: 
            console.log('default', state);
            return state;
    }
};

export default currentUser;

