import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function ProviderContext({ children }) {
  const [register, setRegister] = useState('');

  const context = { register, setRegister };
  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ProviderContext;
