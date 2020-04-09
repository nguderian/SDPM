import TakeAttendance from '../../../student/meeting/TakeAttendance';
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

const TakeAttendanceContainer = connect(mapStateToProps)(TakeAttendance);

export default TakeAttendanceContainer;