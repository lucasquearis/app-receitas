import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/login/Login';
import Comidas from './pages/comidas/Comidas';

function App() {
  return (
    <Switch>
      <div className="containerBoby">
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Comidas } />
      </div>
    </Switch>
  );
}

export default App;
