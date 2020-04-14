import SubmittedQuiz from '../../../../coordinator/forms/quiz/SubmittedQuiz';
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

const SubmittedQuizContainer = connect(mapStateToProps)(SubmittedQuiz);

export default SubmittedQuizContainer;