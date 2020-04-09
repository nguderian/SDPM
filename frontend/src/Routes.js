import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBarContainer from './components/containers/NavBarContainer';
import CreateQuizContainer from './components/containers/coordinator/forms/CreateQuizContainer';
import NewQuizContainer from './components/containers/coordinator/forms/NewQuizContainer';
import ViewQuizzesContainer from './components/containers/student/quiz/ViewQuizzesContainer';
import TakeQuizContainer from './components/containers/student/quiz/TakeQuizContainer';
import AdminClassPage from './components/AdminClassPage';
import Home from './components/Home';
import ViewMeetingsContainer from './components/containers/student/meeting/ViewMeetingsContainer';
import NewMeetingContainer from './components/containers/student/meeting/NewMeetingContainer';
import TakeAttendanceContainer from './components/containers/student/meeting/TakeAttendanceContainer';
import ViewPRsContainer from './components/containers/student/peerReview/ViewPRsContainer';
import TakePRContainer from './components/containers/student/peerReview/TakePRContainer';
import CreateSurveyContainer from './components/containers/coordinator/forms/CreateSurveyContainer';
import NewSurveyContainer from './components/containers/coordinator/forms/NewSurveyCJontainer';

const routes = (
    <Router>
        <NavBarContainer/>
        <Switch> 
            <Route path='/' exact component={Home}/>
            <Route path='/AdminClassPage' exact component={AdminClassPage}/>

            {/* quiz creation */}
            <Route path='/coordinator/Quiz/CreateQuiz' exact component={CreateQuizContainer}/>
            <Route path='/coordinator/Quiz/:title' render={(props) => <NewQuizContainer {...props} />}/>
            
            {/* survey creation */}
            <Route path='/coordinator/Survey/CreateSurvey' exact component={CreateSurveyContainer}/>
            <Route path='/coordinator/Survey/NewSurvey' exact component={NewSurveyContainer}/>
            
            {/* meetings */}
            <Route path='/student/Meeting/ViewMeetings' exact component={ViewMeetingsContainer}/>
            <Route path='/student/Meeting/NewMeeting'  exact component={NewMeetingContainer}/>
            <Route path='/student/Meeting/:title' render={(props) => <TakeAttendanceContainer {...props} />}/>

            {/* complete a quiz */}
            <Route path='/student/Quiz/ViewQuizzes' exact component={ViewQuizzesContainer}/>
            <Route path='/student/Quiz/:title' render={(props) => <TakeQuizContainer {...props}/>}/>

            {/* complete a peer review */}
            <Route path='/student/PeerReview/ViewPeerReviews' exact component={ViewPRsContainer}/>
            <Route path='/student/PeerReview/:title' render={(props) => <TakePRContainer {...props} />} />
        </Switch>
    </Router>
)

export default routes;