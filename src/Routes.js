import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Pages from './pages';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ Pages.ExploreDrinkByIngredients }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ Pages.ExploreFoodByIngredients }
        />
        <Route path="/explorar/comidas/area" component={ Pages.ExploreByLocation } />
        <Route path="/bebidas/:id/in-progress" component={ Pages.DoingDrinks } />
        <Route path="/comidas/:id/in-progress" component={ Pages.DoingFood } />
        <Route path="/receitas-favoritas" component={ Pages.FavorieRecipes } />
        <Route path="/receitas-feitas" component={ Pages.DoneRecipes } />
        <Route path="/bebidas/:id" component={ Pages.FoodDetails } />
        <Route path="/comidas/:id" component={ Pages.FoodDetails } />
        <Route exact path="/explorar/bebidas" component={ Pages.DrinkExplorer } />
        <Route exact path="/explorar/comidas" component={ Pages.FoodExplorer } />
        <Route exact path="/explorar" component={ Pages.Explorer } />
        <Route exact path="/bebidas" component={ Pages.Home } />
        <Route exact path="/comidas" component={ Pages.Home } />
        <Route path="/perfil" component={ Pages.Profile } />
        <Route exact path="/" component={ Pages.Login } />
        <Route path="/" component={ Pages.NotFound } />
      </Switch>
    </div>
  );
}
