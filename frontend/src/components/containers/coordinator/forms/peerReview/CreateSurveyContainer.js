import CreateSurvey from '../../../../coordinator/forms/peerReview/CreateSurvey';
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

const CreateSurveyContainer = connect(mapStateToProps)(CreateSurvey);

export default CreateSurveyContainer;