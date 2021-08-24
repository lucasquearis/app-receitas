import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import AppProvider from './context/AppProvider';

const App = () => (
  <div className="App">
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </div>
);

export default App;
