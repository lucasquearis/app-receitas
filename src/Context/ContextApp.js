import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const ContextApp = createContext();

export const AppProvider = ({ children }) => (
  <ContextApp.Provider value="value">
    {children}
  </ContextApp.Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
