import CreateMeeting from '../../../forms/student/CreateMeeting';
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

const CreateMeetingContainer = connect(mapStateToProps)(CreateMeeting);

export default CreateMeetingContainer;