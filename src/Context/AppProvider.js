import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [search, setSearch] = useState([]);
  const [loadSearch, setLoadSearch] = useState(false);
  const globalState = {
    user: {
      email: userEmail,
    },
    search,
    loadSearch,
  };

  const contextValue = {
    globalState,
    setUserEmail,
    setSearch,
    setLoadSearch,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
