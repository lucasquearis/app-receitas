import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [user, setUser] = useState();
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);

  const contextValue = {
    user,
    setUser,
    drinks,
    setDrinks,
    setFoods,
    foods,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
