import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import Provider from './provider/Provider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MainFoods from './pages/MainFoods';
import FoodProvider from './provider/FoodProvider';
import MainDrinks from './pages/MainDrinks';
import DrinkProvider from './provider/DrinkProvider';

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ MainFoods } />
          <Route exact path="/bebidas" component={ MainDrinks } />
          <Route exact path="/perfil" component={ Profile } />
        </Switch>
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
