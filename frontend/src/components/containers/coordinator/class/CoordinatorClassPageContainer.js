import CoordinatorClassPage from '../../../../components/coordinator/class/CoordinatorClassPage';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
        loggedIn: state.loggedIn,
        userType: state.userType,
        ipAddress: state.ipAddress
    }
}

const CoordinatorClassPageContainer = connect(mapStateToProps)(CoordinatorClassPage);

export default CoordinatorClassPageContainer;