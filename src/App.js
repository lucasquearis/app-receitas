import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Foods, Login, Profile } from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Foods } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </Provider>
  );
}

export default App;
