import CreateQuiz from '../../../coordinator/forms/CreateQuiz';
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

const CreateQuizContainer = connect(mapStateToProps)(CreateQuiz);

export default CreateQuizContainer;