import NewForm from '../../forms/NewForm';
import { connect } from 'react-redux';

const mapStateToProps = state =>{
    return {
        user_id: state.user_id,
        token: state.token,
        loggedIn:state.loggedIn,
        userType:state.userType,
        ip_address:state.ip_address
    }
}


const NewFormContainer = connect(mapStateToProps)(NewForm);

export default NewFormContainer;