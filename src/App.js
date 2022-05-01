import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Imports from ./pages/:
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="" component={ NotFound } />
        </Switch>
    );
  }
}

export default App;
