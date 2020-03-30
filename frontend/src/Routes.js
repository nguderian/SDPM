import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Hello from './components/HelloWorld';
import CreateQuizContainer from './components/containers/forms/coordinator/CreateQuizContainer';
import NewQuizContainer from './components/containers/forms/coordinator/NewQuizContainer';
import ViewAssignmentsContainer from './components/containers/forms/ViewAssignmentsContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import Assignment from './components/forms/Assignment';
import CreateMeetingContainer from './components/containers/forms/coordinator/CreateMeetingContainer';
import NewMeetingContainer from './components/containers/forms/coordinator/NewMeetingContainer';
import CreateSurveyContainer from './components/containers/forms/coordinator/CreateSurveyContainer';
import NewSurveyContainer from './components/containers/forms/coordinator/NewSurveyCJontainer';

const routes = (
    <Router>
        <NavBarContainer/>
        <Switch> 
            <Route path='/' exact component={Hello}/>

            {/* form creation */}
            <Route path='/coordinator/CreateQuiz' exact component={CreateQuizContainer}/>
            <Route path='/coordinator/Quiz/:title' render={(props) => <NewQuizContainer {...props} />}/>
            <Route path='/coordinator/CreateMeeting' exact component={CreateMeetingContainer}/>
            <Route path='/coordinator/NewMeeting' exact component={NewMeetingContainer}/>
            <Route path='/coordinator/CreateSurvey' exact component={CreateSurveyContainer}/>
            <Route path='/coordinator/NewSurvey' exact component={NewSurveyContainer}/>
            
            {/* completing forms - mainly for students */}
            <Route path='/student/viewAssignments' exact component={ViewAssignmentsContainer}/>
            <Route path='/student/viewAssignments/:id' render={ (props) => <Assignment {...props}/>}/>
        </Switch>
    </Router>
)

export default routes;