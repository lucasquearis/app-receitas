import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import DataProvider from './context/DataProvider';
import CategoriesProvider from './context/CategoriesProvider';
import FiltersProvider from './context/FiltersProvider';

function App() {
  return (
    <DataProvider>
      <FiltersProvider>
        <CategoriesProvider>
          <Routes />
        </CategoriesProvider>
      </FiltersProvider>
    </DataProvider>
  );
}

export default App;
