import SubmittedSurvey from '../../../../coordinator/forms/peerReview/SubmittedSurvey';
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

const SubmittedSurveyContainer = connect(mapStateToProps)(SubmittedSurvey);

export default SubmittedSurveyContainer;