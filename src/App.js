import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ MyRecipes } />
      <Route path="/receitas-favoritas" component={ Favorites } />
      <Route path="/:type/:id" render={ (props) => <RecipeDetails { ...props } /> } />
      <Route
        path="/:type/:id/in-progress"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      {/* <Route
        path="/bebidas:id/in-progress"
        render={ (props) => <Drinks { ...props } /> }
      /> */}
    </Switch>
  );
}

export default App;
