import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Services/Routes';
import Provider from './Context/AppProvider';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
