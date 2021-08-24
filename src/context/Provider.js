import React from 'react';
import PropTypes from 'prop-types';
import recipeContext from './Context';

export default function Provider({ children }) {
  const defaultValue = '';
  return (
    <recipeContext.Provider value={ defaultValue }>
      {children}
    </recipeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
