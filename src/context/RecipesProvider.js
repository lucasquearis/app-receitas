// vitals
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';

function RecipesProvider({ children }) {
  const [firstState, setFirstState] = useState(true);
  const globalState = {
    firstState,
    setFirstState,
  };
  return (
    <myContext.Provider value={ globalState }>
      {children}
    </myContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
