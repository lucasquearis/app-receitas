import React from 'react';
import myContext from './myContext';

function recipesProvider({ children }) {
  return (
    <myContext.Provider>
      {children}
    </myContext.Provider>
  );
}

export default recipesProvider;
