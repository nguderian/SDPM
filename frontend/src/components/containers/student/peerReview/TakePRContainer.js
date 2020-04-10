import TakePR from '../../../student/peerReview/TakePR';
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

const TakePRContainer = connect(mapStateToProps)(TakePR);

export default TakePRContainer;