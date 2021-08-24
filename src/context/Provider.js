import React, { useState } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState({ email: '' });

  const context = {
    userEmail,
    setUserEmail,
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
