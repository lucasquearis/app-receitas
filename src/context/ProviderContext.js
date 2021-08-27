import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createBrowserHistory } from 'history';

import useAPI from '../hooks/useAPI';
import RecipesContext from './RecipesContext';

function ProviderContext({ children }) {
  const [register, setRegister] = useState('');
  const API = useAPI();
  const history = createBrowserHistory();
  const context = { register, setRegister, API, history };
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
