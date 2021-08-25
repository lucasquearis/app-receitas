import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import MyProvider from './context/MyProvider';
import FoodProvider from './context/FoodProvider';
import DrinkProvider from './context/DrinkProvider';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <FoodProvider>
          <DrinkProvider>
            <Routes />
          </DrinkProvider>
        </FoodProvider>
      </MyProvider>
    </BrowserRouter>
  );
}

export default App;
