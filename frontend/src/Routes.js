import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Hello from './components/HelloWorld';
import CreateForm from './components/forms/CreateForm';
import NewForm from './components/forms/NewForm';

const routes = (
    <Router>
        <Switch>
            <Route path='/' exact component={Hello}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/CreateForm' exact component={CreateForm}/>
            <Route path='/NewForm' exact component={NewForm}/>
        </Switch>
    </Router>
)

export default routes;