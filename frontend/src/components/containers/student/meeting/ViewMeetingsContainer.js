import ViewMeetings from '../../../student/meeting/ViewMeetings';
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

const ViewMeetingsContainer = connect(mapStateToProps)(ViewMeetings);

export default ViewMeetingsContainer;