import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
}

export default App;
