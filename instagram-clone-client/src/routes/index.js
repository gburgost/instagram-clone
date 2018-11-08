import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import Home from './home';
import Toolbar from '../components/Toolbar';


const Register = () => [<Toolbar />, <h1>Register</h1>]

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/register" exact component={Register} />
    </Switch>
  </Router>
)
