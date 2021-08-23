import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Routes />
    </MyProvider>
  );
}

export default App;
