import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateQuizContainer from './components/containers/coordinator/forms/CreateQuizContainer';
import NewQuizContainer from './components/containers/coordinator/forms/NewQuizContainer';
import ViewQuizzesContainer from './components/containers/student/ViewQuizzesContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import AdminClassPage from './components/AdminClassPage';
import Home from './components/Home';
import TakeQuiz from './components/student/quiz/TakeQuiz';
import CreateMeetingContainer from './components/containers/student/CreateMeetingContainer';
import NewMeetingContainer from './components/containers/student/NewMeetingContainer';
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
            
            {/* meeting creation */}
            <Route path='/student/Meeting/CreateMeeting' exact component={CreateMeetingContainer}/>
            <Route path='/student/Meeting/:title'  render={(props) => <NewMeetingContainer {...props} />}/>

            {/* complete a quiz */}
            <Route path='/student/Quiz/viewQuizzes' exact component={ViewQuizzesContainer}/>
            <Route path='/student/Quiz/:title' render={ (props) => <TakeQuiz {...props}/>}/>
        </Switch>
    </Router>
)

export default routes;