// vitals
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';

function RecipesProvider({ children }) {
  const [firstState, setFirstState] = useState(true);
  const [infoUser, setInfoUser] = useState({
    email: '',
    password: '',
  });
  const globalState = {
    firstState,
    setFirstState,
    infoUser,
    setInfoUser,
  };

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: infoUser.email }));
  }, [infoUser]);

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
