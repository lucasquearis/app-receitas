import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import store from './redux/store/index';

function App() {
  return (
    <Provider store={ store }>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </Provider>
  );
}

export default App;
