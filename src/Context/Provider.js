import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';
import RecipesContext from './RecipesContext';

export default function Provider({ children }) {
  const [userInfo, setUserInfo] = useState({ email: '', password: '', redirect: false });
  const contextLogin = { userInfo, setUserInfo };

  const [recipes, setRecipes] = useState([]);
  const contextRecipes = { recipes, setRecipes };

  return (
    <LoginContext.Provider value={ contextLogin }>
      <RecipesContext.Provider value={ contextRecipes }>
        {children}
      </RecipesContext.Provider>
    </LoginContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
