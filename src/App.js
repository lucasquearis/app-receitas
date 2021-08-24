import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import FooterMenu from './components/FooterMenu';

const App = () => (
  <BrowserRouter>
    <Switch>
      <FooterMenu />
    </Switch>
  </BrowserRouter>
);

export default App;
