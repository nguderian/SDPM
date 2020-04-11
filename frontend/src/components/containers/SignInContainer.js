import SignIn from '../SignIn';
import AuthActions from '../../storeConfig/actions/auth/AuthActions';
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

const mapDispatchToProps = (dispatch) => {
    return {
        login: AuthActions.login(),
    }
}

const SignInContainer = connect(mapStateToProps)(SignIn);

export default SignInContainer;