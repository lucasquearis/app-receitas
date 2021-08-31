import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import MainFood from '../pages/MainFood';
import MainDrink from '../pages/MainDrink';
import Explore from '../pages/Explore';
import ExploreFood from '../pages/ExploreFood';
import ExploreDrink from '../pages/ExploreDrink';
import FoodPerIngredient from '../pages/FoodPerIngredient';
import DrinkPerIngredient from '../pages/DrinkPerIngredient';
import ExplorePerArea from '../pages/ExplorePerArea';
import Profile from '../pages/Profile';
import InProgressDrink from '../pages/InProgressDrink';
import InProgressFood from '../pages/InProgressFood';
import CookedRecipies from '../pages/CookedRecipies';
import FavoriteRecipies from '../pages/FavoriteRecipies';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ MainFood } />
      <Route exact path="/bebidas" component={ MainDrink } />
      {/* <Route exact path="/comidas/{id-da-receita}" component={  } /> */}
      {/* <Route exact path="/bebidas/{id-da-receita}" component={  } /> */}
      <Route
        exact
        path="/comidas/{id-da-receita}/in-progress"
        component={ InProgressFood }
      />
      <Route
        exact
        path="/bebidas/{id-da-receita}/in-progress"
        component={ InProgressDrink }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodPerIngredient }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinkPerIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExplorePerArea } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/receitas-feitas" component={ CookedRecipies } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipies } />
    </Switch>
  );
}

export default Routes;
