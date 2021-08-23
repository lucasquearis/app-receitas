import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Fetch from './fetchs/FetchFood';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route to="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
