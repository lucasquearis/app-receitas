import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const context = {
  mealsToken: 1,
  cocktailsToken: 1,
};

const AppProvider = ({ children }) => (
  <AppContext.Provider value={ context }>
    { children }
  </AppContext.Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
