import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
=======
import { Meals, Login, Profile, Drinks, RecipeDetails } from './pages';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/comidas" component={ Meals } />
        <Route path="/bebidas" component={ Drinks } />
        <Route path="/bebidas/:id" component={ RecipeDetails } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </Provider>
>>>>>>> d5b4da2925f6f32afd5185c020b5f251487fae32
  );
}

export default App;
