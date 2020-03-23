import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import zio from './lib/zio';
import axios from 'axios';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  Promise.resolve().then(() => {
    console.log('dom done');
  });
  useEffect(() => {
    axios.get('/nApi/').then(res => {
      console.log(res);
    });
    Promise.resolve().then(() => {
      console.log('dom done in didmount');
    });
  }, []);
  return <h2>{console.log('rendering')}About</h2>;
}

function Users() {
  return (
    <div>
      <h2>Users</h2>
      <h2>Users</h2>
      <h2>Users</h2>
      <h2>Users</h2>
      <h2>Users</h2>
      <h2>Users</h2>
      <h2>Users</h2>
    </div>
  );
}
const App = () => {
  useEffect(() => {
    zio.init();
  }, []);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
