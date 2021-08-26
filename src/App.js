import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Provider from './context/Provider';
import DrinkDetails from './pages/Details/Drink';
import MealDetails from './pages/Details/Meal';
import Footer from './components/Footer';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import InProgress from './pages/InProgress';

import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Recipes } />
        <Route exact path="/comidas/:id" component={ MealDetails } />
        <Route exact path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/comidas/:id/in-progress" component={ InProgress } />
        <Route path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route exact path="/explorar" />
        <Route exact path="/explorar/comidas" />
        <Route exact path="/explorar/bebidas" />
        <Route path="/explorar/comidas/ingredientes" />
        <Route path="/explorar/bebidas/ingredientes" />
        <Route path="/explorar/comidas/area" />
        <Route path="/perfil" />
        <Route path="/receitas-feitas" component={ DoneRecipes } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" />
        <Route path="/receitas-favoritas" />
      </Switch>
      <Switch>
        <Route exact path="/" />
        <Route path="/comidas/:id" />
        <Route path="/bebidas/:id" />
        <Route path="/" component={ Footer } />
      </Switch>
    </Provider>
  );
}

export default App;
