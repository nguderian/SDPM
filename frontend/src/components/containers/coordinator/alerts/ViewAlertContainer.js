import ViewAlert from '../../../coordinator/alerts/ViewAlert';
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

const ViewAlertContainer = connect(mapStateToProps)(ViewAlert);

export default ViewAlertContainer;