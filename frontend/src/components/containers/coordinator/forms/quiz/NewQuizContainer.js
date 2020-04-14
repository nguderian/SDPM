import NewQuiz from '../../../../coordinator/forms/quiz/NewQuiz';
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

const NewQuizContainer = connect(mapStateToProps)(NewQuiz);

export default NewQuizContainer;