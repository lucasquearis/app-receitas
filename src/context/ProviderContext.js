import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';

import useAPI from '../hooks/useAPI';

function ProviderContext({ children }) {
  const { pathname } = useLocation();
  const API = useAPI(pathname);

  const [register, setRegister] = useState('');
  const context = { register, setRegister, API };

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
