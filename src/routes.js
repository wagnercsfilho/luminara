import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from './screens/Home';
import Favorites from './screens/Favorites';

const Routes = () => (
  <Router>
    <div className="app-container">
      <Route exact path="/" component={Home} />
      <Route path="/favorites" component={Favorites} />
    </div>
  </Router>
)

export default Routes;
