import { ON_LOGIN,
    ON_LOGOUT,
    GET_TOKEN, 
    GET_TYPE
    } from "./actions";

// initial state

const initialState = {
user_id:'',
token:'',
loggedIn:false,
userType:'',
ip_address:'10.171.204.179'
}

function currentUser(state = initialState, action){

switch (action.type){
   case ON_LOGIN:
      return Object.assign({}, state, {
          user_id:action.payload.user_id,
          token: action.payload.token,
          loggedIn:true,
          userType:action.payload.userType,
          ip_address:'10.171.204.179'
      })
   case ON_LOGOUT:     
       return Object.assign({}, state, {
       userType:'',
       user_id:'',
       token:'',
       loggedIn:false,
   })
   case GET_TYPE:
       return state.userType
   case GET_TOKEN:
       return state.token
   default:
       return state
}

}

export default currentUser;