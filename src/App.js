import React from 'react';
import './App.css';
import logoreceitapp from './images/logoreceitapp.png';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Services/Routes';
import Provider from './Context/AppProvider';

function App() {
  return (
    <Provider>
      <div>
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
