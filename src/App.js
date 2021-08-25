import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import './globalStyles.css';
import FoodRecipes from './pages/comidas';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/comidas" component={ FoodRecipes } />
        <Route path="/" component={ Login } />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
