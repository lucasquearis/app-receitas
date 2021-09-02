import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './styles/App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import ExploreFoods from './pages/explore-pages/ExploreFoods';
import Explore from './pages/explore-pages/Explore';
import ExploreIngredients from './pages/explore-pages/ExploreIngredients';
import ExploreOrigin from './pages/explore-pages/ExploreOrigin';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreDrinks from './pages/explore-pages/ExploreDrinks';
import ExploreDrinkIngredient from './pages/explore-pages/ExploreDrinkIngredient';
import RecipeDetails from './pages/RecipeDetails';
import ProgressRecipes from './pages/ProgressRecipes';
import Provider from './context/RecipesProvider';

export default function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkIngredient }
        />
        <Route
          exact
          path="/:type/:id"
          render={ (props) => <RecipeDetails { ...props } /> }
        />
        <Route
          exact
          path="/:type/:id/in-progress"
          render={ (props) => <ProgressRecipes { ...props } /> }
        />
      </Switch>
    </Provider>
  );
}
