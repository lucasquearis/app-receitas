import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <Routes />
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
