import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import { setInitialLocalStorage } from '../helpers';
import AppContext from './AppContext';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [data, setData] = useState({ data: [] });

  useEffect(() => setInitialLocalStorage(user), [user]);

  const context = {
    user,
    setUser,
    data,
    setData,
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
