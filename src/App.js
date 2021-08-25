import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Routes />
    </MyProvider>
  );
}

export default App;
