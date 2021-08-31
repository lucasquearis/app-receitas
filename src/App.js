import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import MyProvider from './context/MyProvider';
import FoodProvider from './context/FoodProvider';
import DrinkProvider from './context/DrinkProvider';

function App() {
  return (
    <FoodProvider>
      <DrinkProvider>
        <MyProvider>
          <Routes />
        </MyProvider>
      </DrinkProvider>
    </FoodProvider>
  );
}

export default App;
