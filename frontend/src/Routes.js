import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Hello from './components/HelloWorld';

const routes = (
    <Router>
        <Switch>
            <Route path='/' exact component={Hello}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/About' exact component={About}/>
        </Switch>
    </Router>
)

export default routes;