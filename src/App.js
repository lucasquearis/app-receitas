import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import DataProvider from './context/DataProvider';
import CategoriesProvider from './context/CategoriesProvider';
import FiltersProvider from './context/FiltersProvider';
import DetailsProvider from './context/DetailsProvider';

function App() {
  return (
    <DataProvider>
      <FiltersProvider>
        <CategoriesProvider>
          <DetailsProvider>
            <Routes />
          </DetailsProvider>
        </CategoriesProvider>
      </FiltersProvider>
    </DataProvider>
  );
}

export default App;
