import React from 'react';
import { Route, Switch } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Header from './Components/Header/index';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks/index';
import Login from './Pages/Login/Login';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails';
import ExploreDrinksOrFoods from './Pages/ExploreDrinksOrFoods';
import ExploreArea from './Pages/ExploreArea';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile/Profile';
import ReceitasFavoritas from './Pages/ReceitasFavoritas/ReceitasFavoritas';

function App() {
  const exploreFoodDrink = (
    <Header
      title="Explorar Ingredientes"
      searchButton={ false }
    />
  );

  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
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
          render={ () => exploreFoodDrink }
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
          render={ () => exploreFoodDrink }
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
            <Header
              title="Receitas Feitas"
              searchButton={ false }
            />
          ) }
        />
        <Route
          exact
          path="/receitas-favoritas"
          render={ () => (
            <Header
              title="Receitas Favoritas"
              searchButton={ false }
            />
          ) }
          component={ ReceitasFavoritas }
        />
        <Route path="/:feedType/:id" component={ RecipeDetails } />
      </Switch>
    </AppProvider>
  );
}

export default App;
