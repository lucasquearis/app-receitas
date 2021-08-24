import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import AppProvider from './context/AppProvider';
// import Header from './components/header/Header';

const App = () => (
  <div className="App">
    {/* <Header /> */}
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </div>
);

export default App;
