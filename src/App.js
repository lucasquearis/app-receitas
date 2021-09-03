import React from 'react';
import { Route, Switch } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Header from './Components/Header/index';
import AllRecipes from './Pages/AllRecipes';
import Login from './Pages/Login/Login';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import ExploreDrinksOrFoods from './Pages/ExploreDrinksOrFoods';
import ExploreArea from './Pages/ExploreArea';
import Explore from './Pages/Explore';
import ExploreIngredients from './Pages/ExploreIngredients';
import Profile from './Pages/Profile/Profile';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import DoneRecipes from './Pages/DoneRecipes';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ AllRecipes } />
        <Route exact path="/bebidas" component={ AllRecipes } />
        <Route
          exact
          path="/explorar"
          component={ Explore }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ ExploreDrinksOrFoods }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExploreArea }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ ExploreDrinksOrFoods }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          render={ () => <div>Not Found</div> }
        />
        <Route
          exact
          path="/perfil"
          render={ () => (
            <Header
              title="Perfil"
              searchButton={ false }
            />
          ) }
          component={ Profile }
        />
        <Route
          exact
          path="/receitas-feitas"
          render={ () => (
            <Header />
          ) }
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/receitas-favoritas"
          render={ () => (
            <Header />
          ) }
          component={ FavoriteRecipes }
        />
        <Route path="/:feedType/:id" component={ RecipeDetails } />
      </Switch>
    </AppProvider>
  );
}

export default App;
