import Home from '../Home';
import { connect } from 'react-redux';

const mapStateToProps = state =>{
    return {
        userId: state.userId,
        token: state.token,
        loggedIn:state.loggedIn,
        userType:state.userType,
        ip_address:state.ip_address
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;