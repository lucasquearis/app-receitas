import React from 'react';

import { Route, Switch } from 'react-router';
import { AppProvider } from './Context/ContextApp';
import Header from './components/Header/index';
import Foods from './Pages/Foods';
import Login from './Pages/Login/Login';

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
        <Route exact path="/bebidas" render={ () => <Header title="Bebidas" /> } />
        <Route
          exact
          path="/explorar"
          render={ () => (
            <Header
              title="Explorar"
              searchButton={ false }
            />
          ) }
        />
        <Route
          exact
          path="/explorar/comidas"
          render={ () => (
            <Header
              title="Explorar Comidas"
              searchButton={ false }
            />
          ) }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          render={ () => exploreFoodDrink }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          render={ () => (
            <Header
              title="Explorar Origem"
            />
          ) }
        />
        <Route
          exact
          path="/explorar/bebidas"
          render={ () => (
            <Header
              title="Explorar Bebidas"
              searchButton={ false }
            />
          ) }
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
        />
      </Switch>
    </AppProvider>
  );
}

export default App;
