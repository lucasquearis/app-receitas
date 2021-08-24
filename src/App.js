import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Meals, Login, Profile, Drinks } from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </Provider>
  );
}

export default App;
