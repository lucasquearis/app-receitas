import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Foods from './pages/foods/Foods';
import Drinks from './pages/drinks/Drinks';
import DetailsFood from './pages/foods/DetailsFood';
import DetailsDrink from './pages/drinks/DetailsDrink';
// teste
function App() {
  return (
    <div className="containerBody">
      <Switch>
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => (
            <DetailsFood { ...props } />
          ) }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => (
            <DetailsDrink { ...props } />
          ) }
        />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
