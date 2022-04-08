import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Settings from './Pages/Settings';
<<<<<<< HEAD
import Feedback from './Pages/Feedback';
=======
import Ranking from './Pages/Ranking';
>>>>>>> 5ac431cee1b494d86d845aabcf414ad2c58197b2

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
<<<<<<< HEAD
      <Route exact path="/feedback" component={ Feedback } />
=======
      <Route exact path="/ranking" component={ Ranking } />
>>>>>>> 5ac431cee1b494d86d845aabcf414ad2c58197b2
    </Switch>
  );
}
