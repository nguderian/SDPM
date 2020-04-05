import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hello from './components/HelloWorld';
import CreateQuizContainer from './components/containers/forms/coordinator/CreateQuizContainer';
import NewQuizContainer from './components/containers/forms/coordinator/NewQuizContainer';
import ViewAssignmentsContainer from './components/containers/forms/ViewAssignmentsContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import AdminClassPage from './components/AdminClassPage';
import Home from './components/Home';
import Assignment from './components/forms/Assignment';
import CreateMeetingContainer from './components/containers/forms/student/CreateMeetingContainer';
import NewMeetingContainer from './components/containers/forms/student/NewMeetingContainer';
import CreateSurveyContainer from './components/containers/forms/coordinator/CreateSurveyContainer';
import NewSurveyContainer from './components/containers/forms/coordinator/NewSurveyCJontainer';

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

            {/* completing forms - mainly for students */}
            <Route path='/student/viewAssignments' exact component={ViewAssignmentsContainer}/>
            <Route path='/student/viewAssignments/:id' render={ (props) => <Assignment {...props}/>}/>
        </Switch>
    </Router>
)

export default routes;