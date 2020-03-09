import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Hello from './components/HelloWorld';
import CreateFormContainer from './components/containers/forms/CreateFormContainer';
import NewFormContainer from './components/containers/forms/NewFormContainer';
import ViewAssignmentsContainer from './components/containers/forms/ViewAssignmentsContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import Assignment from './components/forms/Assignment';

const routes = (
    <Router>
        <NavBarContainer/>
        <Switch> 
            <Route path='/' exact component={Hello}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/CreateForm' exact component={CreateFormContainer}/>
            <Route path='/NewForm' exact component={NewFormContainer}/>
            <Route path='/student/viewAssignments' exact component={ViewAssignmentsContainer}/>
            <Route path='/student/viewAssignments/:id' render={ (props) => <Assignment {...props}/>}/>
        </Switch>
    </Router>
)

export default routes;