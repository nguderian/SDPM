import SubmittedMeeting from '../../../student/meeting/SubmittedMeeting';
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

const SubmittedMeetingContainer = connect(mapStateToProps)(SubmittedMeeting);

export default SubmittedMeetingContainer;