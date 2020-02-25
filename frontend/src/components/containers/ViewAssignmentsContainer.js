import ViewAssignments from '../forms/ViewAssignments';
import {onLogin} from '..//../storeConfig/actions';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        token: state.token,
        loggedIn:state.loggedIn,
        userType:state.userType,
        ip_address:state.ip_address
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         onLogin(payload){
//             dispatch(
//                 onLogin(payload)
//             )
//         }
//     }
// }

const ViewAssignmentsContainer =  connect(mapStateToProps)(ViewAssignments);

export default ViewAssignmentsContainer;