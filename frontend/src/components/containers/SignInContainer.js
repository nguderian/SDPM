import SignIn from '../SignIn';
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

const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignInContainer;