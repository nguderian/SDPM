import NewSurvey from '../../../../coordinator/forms/peerReview/NewSurvey';
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

const NewSurveyContainer = connect(mapStateToProps)(NewSurvey);

export default NewSurveyContainer;