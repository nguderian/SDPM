import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Hello from './components/HelloWorld';
import CreateFormContainer from './components/containers/forms/CreateFormContainer';
import NewFormContainer from './components/containers/forms/NewFormContainer';
import NavBarContainer from './components/containers/NavBarContainer';
import AdminClassPage from './components/AdminClassPage';

const routes = (
    <Router>
        <NavBarContainer/>
        <Switch> 
            <Route path='/' exact component={Hello}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/CreateForm' exact component={CreateFormContainer}/>
            <Route path='/NewForm' exact component={NewFormContainer}/>
            <Route path='/AdminClassPage' exact component={AdminClassPage}/>
        </Switch>
    </Router>
)

export default routes;