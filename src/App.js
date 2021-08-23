import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import MyRecipes from './pages/MyRecipes';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/explorar" component={ Profile } />
      <Route path="/explorar" component={ MyRecipes } />
      <Route path="/explorar" component={ Favorites } />
      <Route path="/comidas:id" render={ (props) => <Foods { ...props } /> } />
      <Route path="/bebidas:id" render={ (props) => <Drinks { ...props } /> } />
      <Route
        path="/comidas:id/in-progress"
        render={ (props) => <Foods { ...props } /> }
      />
      <Route
        path="/bebidas:id/in-progress"
        render={ (props) => <Drinks { ...props } /> }
      />
    </Switch>
  );
}

export default App;
