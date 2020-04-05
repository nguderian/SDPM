import TakeQuiz from '../../../student/quiz/TakeQuiz';
import {onLogin} from '../../../../storeConfig/actions';
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

// const mapDispatchToProps = dispatch => {
//     return{
//         onLogin(payload){
//             dispatch(
//                 onLogin(payload)
//             )
//         }
//     }
// }

const TakeQuizContainer =  connect(mapStateToProps)(TakeQuiz);

export default TakeQuizContainer;