import React, { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const DataContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState({});

  const contextValue = { data, setData };

  return (
    <DataContext.Provider value={ contextValue }>
      { children }
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

DataProvider.propTypes = {
  children: node.isRequired,
};
