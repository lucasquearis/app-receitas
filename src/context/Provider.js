import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { setInitialLocalStorage } from '../helpers';
import AppContext from './AppContext';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [data, setData] = useState({ data: [] });
  const [favoriteRcps, setFavoriteRcps] = useState([]);

  function loadLocalStorageToState() {
    if (JSON.parse(localStorage.favoriteRecipes).length) {
      setFavoriteRcps([
        ...JSON.parse(localStorage.favoriteRecipes),
      ]);
    }
  }

  useEffect(() => setInitialLocalStorage(user), [user]);
  useEffect(() => loadLocalStorageToState(), []);

  const context = {
    user,
    setUser,
    data,
    setData,
    favoriteRcps,
    setFavoriteRcps,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: node.isRequired,
};

export default Provider;
