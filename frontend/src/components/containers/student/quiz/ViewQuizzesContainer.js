import ViewQuizzes from '../../../student/quiz/ViewQuizzes';
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


const ViewQuizzesContainer =  connect(mapStateToProps)(ViewQuizzes);

export default ViewQuizzesContainer;