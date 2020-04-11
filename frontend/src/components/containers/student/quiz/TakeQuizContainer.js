import TakeQuiz from '../../../student/quiz/TakeQuiz';
import {connect} from 'react-redux';

const mapStateToProps = state =>{
    return {
        userId: state.userId,
        token: state.token,
        loggedIn:state.loggedIn,
        userType:state.userType,
        loggedIn:state.ipAddress,
    }
}


const TakeQuizContainer =  connect(mapStateToProps)(TakeQuiz);

export default TakeQuizContainer;