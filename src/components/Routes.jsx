import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import MainFood from '../pages/MainFood';
import MainDrink from '../pages/MainDrink';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ MainFood } />
    <Route exact path="/bebidas" component={ MainDrink } />
    {/* <Route exact path="/comidas/{id-da-receita}" component={  } /> */}
    {/* <Route exact path="/bebidas/{id-da-receita}" component={  } />
    <Route exact path="/comidas/{id-da-receita}/in-progress" component={  } />
    <Route exact path="/bebidas/{id-da-receita}/in-progress" component={  } />
    <Route exact path="/explorar" component={  } />
    <Route exact path="/explorar/comidas" component={  } />
    <Route exact path="/explorar/bebidas" component={  } />
    <Route exact path="/explorar/comidas/ingredientes" component={  } />
    <Route exact path="/explorar/bebidas/ingredientes" component={  } />
    <Route exact path="/explorar/comidas/area" component={  } />
    <Route exact path="/perfil" component={  } />
    <Route exact path="/receitas-feitas" component={  } />
    <Route exact path="/receitas-favoritas" component={  } /> */}
  </Switch>
);

export default Routes;
