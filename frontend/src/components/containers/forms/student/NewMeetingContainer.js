import NewMeeting from '../../../forms/student/NewMeeting';
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

const NewMeetingContainer = connect(mapStateToProps)(NewMeeting);

export default NewMeetingContainer;