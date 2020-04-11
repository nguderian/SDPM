import AuthActionTypes from './AuthActionTypes';
import axios from 'axios';

class AuthActions {
    login = (username, password) => async (dispatch) => {
        dispatch({
            type: AuthActionTypes.ON_LOGIN,
            payload: {}
        });
        
        const body = {
            'username': username,
            'password': password
        };
    
        let options = {
            method: 'POST',
            url: 'http://localhost:3001/api/login_secure',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };
    
        let response = await axios(options);
        let responseOK = response && response.status === 200 && response.statusText === 'OK';
        if(responseOK) {
            // Successful login
            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: {
                    userId: response.data.user_id,
                    userType: response.data.type,
                    token: response.data.token,
                    loggedIn: true,
                    ipAddress: '10.171.204.179'
                }
            });
        }
    };
    
    logout = () => async (dispatch) => {
        dispatch({
            type: AuthActionTypes.ON_LOGOUT,
            payload: {}
        });
    };
}

export default new AuthActions();