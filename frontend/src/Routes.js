import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NavBarContainer from './components/containers/NavBarContainer';
import SignInContainer from './components/containers/SignInContainer';
import HomeContainer from './components/containers/HomeContainer';
import CreateQuizContainer from './components/containers/coordinator/forms/quiz/CreateQuizContainer';
import NewQuizContainer from './components/containers/coordinator/forms/quiz/NewQuizContainer';
import ViewQuizzesContainer from './components/containers/student/quiz/ViewQuizzesContainer';
import CoordinatorClassPageContainer from './components/containers/coordinator/class/CoordinatorClassPageContainer';
import CoordinatorClassPage from './components/coordinator/class/CoordinatorClassPage';
import TakeQuizContainer from './components/containers/student/quiz/TakeQuizContainer';
import Home from './components/Home';
import ViewMeetingsContainer from './components/containers/student/meeting/ViewMeetingsContainer';
import NewMeetingContainer from './components/containers/student/meeting/NewMeetingContainer';
import TakeAttendanceContainer from './components/containers/student/meeting/TakeAttendanceContainer';
import ViewPRsContainer from './components/containers/student/peerReview/ViewPRsContainer';
import TakePRContainer from './components/containers/student/peerReview/TakePRContainer';
import CreateSurveyContainer from './components/containers/coordinator/forms/peerReview/CreateSurveyContainer';
import NewSurveyContainer from './components/containers/coordinator/forms/peerReview/NewSurveyCJontainer';
import ViewAlertContainer from './components/containers/coordinator/alerts/ViewAlertContainer';
import SubmittedQuizContainer from './components/containers/coordinator/forms/quiz/SubmittedQuizContainer';
import SubmittedMeetingContainer from './components/containers/student/meeting/SubmittedMeetingContainer';
import SubmittedSurveyContainer from './components/containers/coordinator/forms/peerReview/SubmittedSurveyContainer';
import { createBrowserHistory } from 'history';

const routes = () => {
    const history = createBrowserHistory();
    return (
        <Fragment>
            <Router history={history}>
                <NavBarContainer/>
                <Switch>
                    <Route path='/' exact component={SignInContainer}/>
                    <Route path='/Home' exact component={HomeContainer} />
                    
                    {/* alerts */}
                    <Route path='/coordinator/Alert/ViewAlert/:title' render={(props) => <ViewAlertContainer {...props} />} />
                    
                    {/* classes */}
                    <Route path='/coordinator/CoordinatorClassPage' exact component={CoordinatorClassPageContainer} />

                    {/* quiz creation */}
                    <Route path='/coordinator/Quiz/CreateQuiz' exact component={CreateQuizContainer} />
                    <Route path='/coordinator/Quiz/:title' render={(props) => <NewQuizContainer {...props} />} />
                    
                    {/* survey creation */}
                    <Route path='/coordinator/Survey/CreateSurvey' exact component={CreateSurveyContainer} />
                    <Route path='/coordinator/Survey/:title' render={(props) => <NewSurveyContainer {...props} />} />
                    
                    {/* meetings */}
                    <Route path='/student/Meeting/ViewMeetings' exact component={ViewMeetingsContainer} />
                    <Route path='/student/Meeting/NewMeeting'  render={(props) => <NewMeetingContainer {...props} />} />
                    <Route path='/student/Meeting/:title' render={(props) => <TakeAttendanceContainer {...props} />} />

                    {/* complete a quiz */}
                    <Route path='/student/Quiz/ViewQuizzes' exact component={ViewQuizzesContainer} />
                    <Route path='/student/Quiz/:title' render={(props) => <TakeQuizContainer {...props}/>} />

                    {/* View submissions */}
                    <Route path='/viewSubmission/Quiz/:title' render={(props) => <SubmittedQuizContainer {...props} />} />
                    <Route path='/viewSubmission/Meeting/:title' render={(props) => <SubmittedMeetingContainer {...props} />} />
                    <Route path='/viewSubmission/PeerReview/:title' render={(props) => <SubmittedSurveyContainer {...props} /> } />
                    
                    {/* complete a peer review */}
                    <Route path='/student/PeerReview/ViewPeerReviews' exact component={ViewPRsContainer} />
                    <Route path='/student/PeerReview/:title' render={(props) => <TakePRContainer {...props} />} />
                </Switch>
            </Router>
        </Fragment>
    )
}




export default routes;