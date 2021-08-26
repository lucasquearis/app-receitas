import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

export default function Provider({ children }) {
  const [userInfo, setUserInfo] = useState({ email: '', password: '', redirect: false });
  const contextLogin = { userInfo, setUserInfo };

  return (
    <LoginContext.Provider value={ contextLogin }>
      {children}
    </LoginContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
