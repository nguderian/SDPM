import ViewPRs from '../../../student/peerReview/ViewPRs';
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

const ViewPRsContainer = connect(mapStateToProps)(ViewPRs);

export default ViewPRsContainer;