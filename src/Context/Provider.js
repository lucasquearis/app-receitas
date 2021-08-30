import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const contextValue = { email, setEmail };

  return (
    <LoginContext.Provider value={ contextValue }>
      {children}
    </LoginContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
