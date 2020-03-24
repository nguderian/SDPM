import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Hello from './components/HelloWorld';
// import CreateQuizContainer from './components/containers/forms/coordinator/CreateQuizContainer';
// import NewFormContainer from './components/containers/forms/coordinator/NewFormContainer';
import ViewAssignmentsContainer from './components/containers/forms/ViewAssignmentsContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import Assignment from './components/forms/Assignment';
import CreateMeetingContainer from './components/containers/forms/coordinator/CreateMeetingContainer';
import NewMeetingContainer from './components/containers/forms/coordinator/NewMeetingContainer';

const routes = (
    <Router>
        <NavBarContainer/>
        <Switch> 
            <Route path='/' exact component={Hello}/>
            <Route path='/login' exact component={Login}/>
            {/* <Route path='/CreateQuiz' exact component={CreateQuizContainer}/> */}
            {/* <Route path='/NewForm' exact component={NewFormContainer}/> */}
            <Route path='/CreateMeeting' exact component={CreateMeetingContainer}/>
            <Route path='/NewMeeting' exact component={NewMeetingContainer}/>
            <Route path='/student/viewAssignments' exact component={ViewAssignmentsContainer}/>
            <Route path='/student/viewAssignments/:id' render={ (props) => <Assignment {...props}/>}/>
        </Switch>
    </Router>
)

export default routes;