// action types 
export const ON_LOGIN = 'ON_LOGIN'
export const ON_LOGOUT = 'ON_LOGOUT'
export const GET_TOKEN = 'GET_TOKEN'
export const  IS_LOGGED_IN = 'IS_LOGGED_IN'
export const GET_TYPE = 'GET_TYPE'

// action creators
export function getType(){
    return{ type: GET_TYPE}
}
export function onLogin(payload){
    return{type: ON_LOGIN, payload}
}

export function onLogout(){
    return{type: ON_LOGOUT}
}

export function getToken(){
    return{type:GET_TOKEN}
}

export function isLoggedIn(){
    return{type:IS_LOGGED_IN}
}