import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const context = {};

const AppProvider = ({ children }) => (
  <AppContext.Provider value={ context }>
    { children }
  </AppContext.Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
